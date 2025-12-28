import { showToast } from '../utils.js';
import { StorageService } from '../services/StorageService.js';
import { NewsletterService } from '../services/NewsletterService.js';

export class Sidebar {
    constructor() {
        this.newsletterService = new NewsletterService();
        this.init();
    }

    init() {
        this.loadTrendingTopics();
        this.loadTopGainers();
        this.loadMarketMovers();
        this.initNewsletter();
    }

    loadTrendingTopics() {
        const topics = ['#Bitcoin', '#Ethereum', '#DeFi', '#NFTs', '#Regulation'];
        const container = document.getElementById('trending-tags');
        if (container) {
            container.innerHTML = topics.map(tag => `<span class="trending-tag">${tag}</span>`).join('');
        }
    }

    loadTopGainers() {
        const gainers = [
            { symbol: 'SOL', change: '+12.5%' },
            { symbol: 'AVAX', change: '+8.2%' },
            { symbol: 'MATIC', change: '+6.4%' }
        ];
        const container = document.getElementById('gainers-list');
        if (container) {
            container.innerHTML = gainers.map(coin => `
                <div class="gainer-item">
                    <span class="gainer-symbol">${coin.symbol}</span>
                    <span class="gainer-change positive">${coin.change}</span>
                </div>
            `).join('');
        }
    }

    loadMarketMovers() {
        // Mock data
        const container = document.getElementById('market-movers');
        if (container) {
            // ... implementation if needed, or skip as it acts similar to gainers
        }
    }

    initNewsletter() {
        const form = document.getElementById('newsletter-form');
        if (!form) return;

        const btn = form.querySelector('button');
        const input = form.querySelector('input');
        const privacyText = document.querySelector('.newsletter-privacy');

        // Check if already subscribed
        if (StorageService.get('newsletter_subscribed')) {
            this.setSubscribedState(btn, input);
        }

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = input.value;
            btn.disabled = true;
            btn.textContent = window.i18n ? window.i18n.t('sidebar.newsletter.subscribing') : 'Subscribing...';

            // Call Service
            const result = await this.newsletterService.subscribe(email);

            if (result.success) {
                showToast(result.message);
                this.setSubscribedState(btn, input);
                if (privacyText) privacyText.style.display = 'none'; // Hide privacy text on success
            } else {
                showToast(result.message);
                input.classList.add('error');
                btn.disabled = false;
                btn.textContent = window.i18n ? window.i18n.t('sidebar.newsletter.button') : 'Subscribe';

                // Shake animation or similar could go here
                setTimeout(() => input.classList.remove('error'), 2000);
            }
        });
    }

    setSubscribedState(btn, input) {
        if (btn) {
            btn.textContent = window.i18n ? window.i18n.t('sidebar.newsletter.subscribed') : 'Subscribed';
            btn.classList.add('success');
            btn.disabled = true;
        }
        if (input) {
            input.disabled = true;
            input.value = '';
            input.placeholder = 'Thanks for subscribing!';
        }
    }
}
