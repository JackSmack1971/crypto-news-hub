// CryptoSphere News Hub - Main Application JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initTheme();
    initTicker();
    initMobileMenu();
    initSearch();
    initCategoryFilters();
    initNewsletter();
    initTimeframeButtons();
    loadNews();
    loadSidebarWidgets();
    
    // Set up real-time updates
    setInterval(updatePrices, 30000); // Update prices every 30 seconds
});

// ==========================================
// Theme Management
// ==========================================
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        showToast(`Switched to ${newTheme === 'dark' ? 'dark' : 'light'} mode`);
    });
}

// ==========================================
// Crypto Ticker
// ==========================================
function initTicker() {
    const tickerContainer = document.getElementById('crypto-ticker');
    
    // Create ticker items (duplicate for seamless loop)
    const tickerHTML = window.cryptoData.map(coin => `
        <div class="ticker-item">
            <span class="ticker-symbol">${coin.icon} ${coin.symbol}</span>
            <span class="ticker-price">$${formatNumber(coin.price)}</span>
            <span class="ticker-change ${coin.change >= 0 ? 'positive' : 'negative'}">
                ${coin.change >= 0 ? '+' : ''}${coin.change.toFixed(2)}%
            </span>
        </div>
    `).join('');
    
    // Duplicate for seamless scrolling
    tickerContainer.innerHTML = tickerHTML + tickerHTML;
}

// ==========================================
// Mobile Menu
// ==========================================
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    const mobileNavLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            mobileMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            filterByCategory(link.dataset.category);
            updateActiveNav(link.dataset.category);
        });
    });
}

// ==========================================
// Search Functionality
// ==========================================
function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    let debounceTimer;
    
    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const query = e.target.value.trim().toLowerCase();
            
            if (query.length < 2) {
                searchResults.classList.remove('active');
                return;
            }
            
            const results = window.newsArticles.filter(article => 
                article.title.toLowerCase().includes(query) ||
                article.excerpt.toLowerCase().includes(query) ||
                article.category.toLowerCase().includes(query)
            ).slice(0, 6);
            
            if (results.length > 0) {
                searchResults.innerHTML = results.map(article => `
                    <div class="search-result-item" data-id="${article.id}">
                        <div class="search-result-title">${highlightMatch(article.title, query)}</div>
                        <div class="search-result-category">${window.categoryNames[article.category] || article.category}</div>
                    </div>
                `).join('');
                searchResults.classList.add('active');
            } else {
                searchResults.innerHTML = '<div class="search-result-item"><div class="search-result-title">No results found</div></div>';
                searchResults.classList.add('active');
            }
        }, 300);
    });
    
    // Handle result click
    searchResults.addEventListener('click', (e) => {
        const resultItem = e.target.closest('.search-result-item');
        if (resultItem && resultItem.dataset.id) {
            const article = window.newsArticles.find(a => a.id === parseInt(resultItem.dataset.id));
            if (article) {
                showToast(`Opening: ${article.title.substring(0, 40)}...`);
                searchInput.value = '';
                searchResults.classList.remove('active');
            }
        }
    });
    
    // Close search on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            searchResults.classList.remove('active');
        }
    });
}

function highlightMatch(text, query) {
    const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
    return text.replace(regex, '<mark style="background: var(--accent-glow); color: var(--accent-primary);">$1</mark>');
}

function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ==========================================
// Category Filtering
// ==========================================
function initCategoryFilters() {
    const filterChips = document.querySelectorAll('.filter-chip');
    const navLinks = document.querySelectorAll('.nav-link');
    const categoryCards = document.querySelectorAll('.category-card');
    let currentCategory = 'all';
    
    function filterByCategory(category) {
        currentCategory = category;
        const newsGrid = document.getElementById('news-grid');
        const filteredArticles = category === 'all' 
            ? window.newsArticles 
            : window.newsArticles.filter(a => a.category === category);
        
        // Update hero section with first article of category
        if (filteredArticles.length > 0) {
            updateHero(filteredArticles[0]);
        }
        
        // Re-render news grid
        renderNewsGrid(filteredArticles);
    }
    
    // Filter chips click handler
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            filterByCategory(chip.dataset.category);
        });
    });
    
    // Navigation link click handler
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            updateActiveNav(link.dataset.category);
            filterByCategory(link.dataset.category);
        });
    });
    
    // Category card click handler
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            filterByCategory(category);
            updateActiveNav(category);
            filterChips.forEach(chip => {
                chip.classList.toggle('active', chip.dataset.category === category);
            });
            // Scroll to news section
            document.querySelector('.news-feed-section').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

function updateActiveNav(category) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.dataset.category === category);
    });
}

function updateHero(article) {
    document.getElementById('hero-title').textContent = article.title;
    document.getElementById('hero-excerpt').textContent = article.excerpt;
    document.querySelector('.hero-author').textContent = `By ${article.author}`;
    document.querySelector('.hero-date').textContent = article.date;
    document.querySelector('.hero-read-time').textContent = article.readTime;
}

function renderNewsGrid(articles) {
    const newsGrid = document.getElementById('news-grid');
    
    if (articles.length === 0) {
        newsGrid.innerHTML = `
            <div class="no-results" style="text-align: center; padding: 60px 20px;">
                <p style="font-size: 18px; color: var(--text-muted);">No articles found for this category.</p>
            </div>
        `;
        return;
    }
    
    newsGrid.innerHTML = articles.map(article => `
        <article class="news-card" data-id="${article.id}">
            <div class="news-card-image">
                <img src="${article.image}" alt="${article.title}" loading="lazy" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 800 500%22><rect fill=%22%231e293b%22 width=%22800%22 height=%22500%22/><text fill=%22%2364748b%22 font-family=%22sans-serif%22 font-size=%2240%22 x=%2250%%22 y=%2250%%22 text-anchor=%22middle%22>${article.category.toUpperCase()}</text></svg>'">
            </div>
            <div class="news-card-content">
                <span class="news-card-category">${window.categoryNames[article.category] || article.category}</span>
                <h3 class="news-card-title">${article.title}</h3>
                <p class="news-card-excerpt">${article.excerpt}</p>
                <div class="news-card-meta">
                    <span class="news-card-author">By ${article.author}</span>
                    <span class="news-card-date">${article.date}</span>
                    <span>${article.readTime}</span>
                </div>
            </div>
        </article>
    `).join('');
}

function loadNews() {
    renderNewsGrid(window.newsArticles);
}

// ==========================================
// Sidebar Widgets
// ==========================================
function loadSidebarWidgets() {
    loadTrendingTopics();
    loadTopGainers();
    loadMarketMovers();
}

function loadTrendingTopics() {
    const container = document.getElementById('trending-tags');
    container.innerHTML = window.trendingTopics.map(topic => `
        <a href="#" class="trending-tag" data-tag="${topic.tag}">
            #${topic.tag} <span class="count">${formatNumber(topic.count)}</span>
        </a>
    `).join('');
    
    // Add click handlers
    container.querySelectorAll('.trending-tag').forEach(tag => {
        tag.addEventListener('click', (e) => {
            e.preventDefault();
            showToast(`Exploring #${tag.dataset.tag}`);
        });
    });
}

function loadTopGainers() {
    const container = document.getElementById('gainers-list');
    container.innerHTML = window.topGainers.map(gainer => `
        <div class="gainer-item">
            <span class="gainer-rank">${gainer.rank}</span>
            <div class="gainer-info">
                <span class="gainer-name">${gainer.name}</span>
                <span class="gainer-symbol">${gainer.symbol}</span>
            </div>
            <span class="gainer-change">+${gainer.change.toFixed(2)}%</span>
        </div>
    `).join('');
}

function loadMarketMovers() {
    const container = document.getElementById('market-movers');
    container.innerHTML = window.marketMovers.map(mover => `
        <div class="mover-item">
            <div class="mover-icon" style="background: ${mover.color}">${mover.name[0]}</div>
            <div class="mover-info">
                <span class="mover-name">${mover.name}</span>
                <span class="mover-price">${mover.price}</span>
            </div>
            <span class="mover-change ${mover.change >= 0 ? 'positive' : 'negative'}" style="background: ${mover.change >= 0 ? 'var(--positive-bg)' : 'var(--negative-bg)'}">
                ${mover.change >= 0 ? '+' : ''}${mover.change.toFixed(2)}%
            </span>
        </div>
    `).join('');
}

// ==========================================
// Newsletter
// ==========================================
function initNewsletter() {
    const form = document.getElementById('newsletter-form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('.newsletter-input').value;
        
        if (validateEmail(email)) {
            showToast('Successfully subscribed to newsletter!');
            form.querySelector('.newsletter-input').value = '';
        } else {
            showToast('Please enter a valid email address');
        }
    });
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// ==========================================
// Timeframe Buttons
// ==========================================
function initTimeframeButtons() {
    const buttons = document.querySelectorAll('.timeframe-btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Simulate different data based on timeframe
            const period = btn.dataset.period;
            simulateDataUpdate(period);
        });
    });
}

function simulateDataUpdate(period) {
    const multipliers = { '24h': 1, '7d': 1.05, '30d': 1.12 };
    const multiplier = multipliers[period] || 1;
    
    // Update market stats with simulated changes
    document.getElementById('total-market-cap').textContent = `$${(2.45 * multiplier).toFixed(2)}T`;
    document.getElementById('volume-24h').textContent = `$${(98.2 * multiplier).toFixed(1)}B`;
    
    const change = ((Math.random() - 0.3) * 5).toFixed(2);
    const changeEl = document.querySelector('.market-stats .stat-card:first-child .stat-change');
    changeEl.textContent = `+${change}%`;
    changeEl.className = 'stat-change positive';
    
    showToast(`Showing ${period} data`);
}

// ==========================================
// Real-time Price Updates
// ==========================================
function updatePrices() {
    // Simulate price updates with random variations
    window.cryptoData.forEach(coin => {
        const variation = (Math.random() - 0.5) * 0.5; // ±0.25% variation
        coin.price = coin.price * (1 + variation / 100);
        coin.change = coin.change + (Math.random() - 0.5) * 0.5;
    });
    
    // Update ticker
    initTicker();
    
    // Update market movers
    loadMarketMovers();
}

// ==========================================
// Utility Functions
// ==========================================
function formatNumber(num) {
    if (num >= 1) {
        return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } else {
        return num.toFixed(4);
    }
}

// ==========================================
// Toast Notifications
// ==========================================
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    toastMessage.textContent = message;
    toast.classList.add('active');
    
    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}

// ==========================================
// Header Scroll Effect
// ==========================================
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
});

// ==========================================
// Load More Button
// ==========================================
document.getElementById('load-more-btn').addEventListener('click', () => {
    const btn = document.getElementById('load-more-btn');
    btn.textContent = 'Loading...';
    btn.disabled = true;
    
    // Simulate loading more articles
    setTimeout(() => {
        showToast('No more articles to load');
        btn.textContent = 'Load More Articles';
        btn.disabled = false;
    }, 1000);
});

// ==========================================
// Smooth Image Loading
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        
        // Set initial opacity for fade-in effect
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
});

// ==========================================
// Intersection Observer for Animations
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply fade-in animation to cards
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.news-card, .stat-card, .category-card, .sidebar-widget');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`;
        fadeInObserver.observe(el);
    });
});

// ==========================================
// Keyboard Navigation
// ==========================================
document.addEventListener('keydown', (e) => {
    // ESC to close mobile menu
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            document.getElementById('mobile-menu-toggle').classList.remove('active');
        }
    }
    
    // Ctrl/Cmd + K for search focus
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('search-input').focus();
    }
});

console.log('CryptoSphere News Hub initialized successfully!');
