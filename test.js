const { chromium } = require('playwright');
const path = require('path');
const http = require('http');
const fs = require('fs');

async function testWebsite() {
    console.log('Starting browser test...');

    // Start a simple local server to serve static files (avoids CORS issues with file://)
    const server = http.createServer((req, res) => {
        let filePath = '.' + req.url;
        if (filePath === './') filePath = './index.html';

        const extname = path.extname(filePath);
        let contentType = 'text/html';
        switch (extname) {
            case '.js': contentType = 'text/javascript'; break;
            case '.css': contentType = 'text/css'; break;
            case '.json': contentType = 'application/json'; break;
            case '.png': contentType = 'image/png'; break;
            case '.jpg': contentType = 'image/jpg'; break;
        }

        fs.readFile(filePath, (error, content) => {
            if (error) {
                if (error.code == 'ENOENT') {
                    res.writeHead(404);
                    res.end('404 Not Found');
                } else {
                    res.writeHead(500);
                    res.end('500: ' + error.code);
                }
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    });

    const port = 3000;
    server.listen(port);
    console.log(`Server running at http://localhost:${port}/`);

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    const errors = [];
    const warnings = [];

    // Capture console messages
    page.on('console', msg => {
        if (msg.type() === 'error') {
            errors.push(msg.text());
        } else if (msg.type() === 'warning') {
            warnings.push(msg.text());
        }
    });

    // Capture page errors
    page.on('pageerror', err => {
        errors.push(err.message);
    });

    try {
        // Navigate to localhost
        await page.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle' });

        console.log('Page loaded successfully!');

        // Wait for content to render and i18n to init
        await page.waitForTimeout(2000);

        // Check if main elements exist
        const checks = [
            { selector: '#header', name: 'Header' },
            { selector: '#crypto-ticker', name: 'Crypto Ticker' },
            { selector: '.news-grid', name: 'News Grid' },
            { selector: '.sidebar', name: 'Sidebar' },
            { selector: '#theme-toggle', name: 'Theme Toggle' },
            { selector: '#search-input', name: 'Search Input' },
            { selector: '.filter-chip', name: 'Category Filters' },
            { selector: '#trending-tags', name: 'Trending Tags' },
            { selector: '.footer', name: 'Footer' }
        ];

        console.log('\nElement checks:');
        for (const check of checks) {
            const element = await page.$(check.selector);
            console.log(`  ${element ? '✓' : '✗'} ${check.name}`);
            if (!element) {
                errors.push(`Missing element: ${check.name} (${check.selector})`);
            }
        }

        // Verify i18n Text Injection (Check a specific key)
        const heroTitle = await page.textContent('#hero-title');
        console.log(`\ni18n Check (Hero Title): "${heroTitle}"`);
        if (heroTitle.trim() === 'Bitcoin Surges Past $50K as Institutional Interest Grows') {
            console.log('✓ i18n loaded correctly (matches en.json)');
        } else {
            errors.push('i18n text mismatch or failure');
        }

        // Test theme toggle
        await page.click('#theme-toggle');
        await page.waitForTimeout(500);
        const theme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
        console.log(`\nTheme toggle test: ${theme === 'light' ? '✓' : '✗'} (switched to ${theme})`);

        // Test search functionality
        await page.fill('#search-input', 'Bitcoin');
        await page.waitForTimeout(500);
        const searchResults = await page.$('.search-results.active');
        console.log(`Search test: ${searchResults ? '✓' : '✗'} (results displayed)`);

        // Test category filter
        await page.click('.filter-chip[data-category="defi"]');
        await page.waitForTimeout(500);
        const activeFilter = await page.$('.filter-chip.active[data-category="defi"]');
        console.log(`Category filter test: ${activeFilter ? '✓' : '✗'} (DeFi filter active)`);

        // RESET FILTER TO ALL for Pagination Test
        // (Otherwise DeFi filter leaves only 1 item, hiding Load More button)
        await page.click('.filter-chip[data-category="all"]');
        await page.waitForTimeout(500);

        // Check initial news cards rendered (Should be capped at 6 for pagination)
        const initialCards = await page.$$('.news-card');
        console.log(`\nInitial News cards: ${initialCards.length}`);
        if (initialCards.length <= 6) {
            console.log('✓ Initial pagination limit respected (<= 6)');
        } else {
            errors.push(`Pagination failed: Expected <= 6 cards, found ${initialCards.length}`);
        }

        // Test Pagination (Load More)
        const loadMoreBtn = await page.$('#load-more-btn');
        if (loadMoreBtn) {
            console.log('Testing "Load More" functionality...');
            await loadMoreBtn.click();
            await page.waitForTimeout(1500); // Wait for mock delay

            const updatedCards = await page.$$('.news-card');
            console.log(`Updated News cards: ${updatedCards.length}`);

            if (updatedCards.length > initialCards.length) {
                console.log('✓ Load More works (items added)');
            } else {
                errors.push('Load More failed: No new items added');
            }
        } else {
            console.log('⚠ Load More button not found (possibly hidden due to low item count)');
        }

        // Check ticker items
        const tickerItems = await page.$$('.ticker-item');
        console.log(`Ticker items: ${tickerItems.length}`);

        // Test Article Modal
        console.log('\nTesting Article Modal...');
        // Click the first news card
        const firstCard = await page.$('.news-card');
        if (firstCard) {
            await firstCard.click();
            await page.waitForTimeout(500); // Animation

            // Check if overlay is active
            const overlayVisible = await page.isVisible('.modal-overlay.active');
            console.log(`Modal opened: ${overlayVisible ? '✓' : '✗'}`);
            if (!overlayVisible) errors.push('Modal failed to open');

            // Check content
            const modalTitle = await page.textContent('.modal-title');
            console.log(`Modal Title: "${modalTitle}"`);
            if (!modalTitle) errors.push('Modal title empty');

            // Close modal
            await page.click('.modal-close');
            await page.waitForTimeout(500);
            const overlayHidden = await page.isHidden('.modal-overlay.active');
            console.log(`Modal closed: ${overlayHidden ? '✓' : '✗'}`);
            if (!overlayHidden) errors.push('Modal failed to close');
        } else {
            console.log('⚠ No cards to click for modal test');
        }

    } catch (err) {
        errors.push(`Test error: ${err.message}`);
    }

    await browser.close();
    server.close();

    // Report results
    console.log('\n' + '='.repeat(50));
    console.log('TEST RESULTS');
    console.log('='.repeat(50));

    if (errors.length === 0) {
        console.log('✓ All tests passed! No errors detected.');
    } else {
        console.log(`✗ ${errors.length} error(s) found:`);
        errors.forEach(err => console.log(`  - ${err}`));
    }

    if (warnings.length > 0) {
        console.log(`\n⚠ ${warnings.length} warning(s):`);
        warnings.forEach(warn => console.log(`  - ${warn}`));
    }

    console.log('='.repeat(50));

    // Exit with error code if there are errors
    process.exit(errors.length > 0 ? 1 : 0);
}

testWebsite().catch(err => {
    console.error('Test failed:', err);
    process.exit(1);
});
