import { showToast, validateEmail } from '../utils.js';
import { StorageService } from '../services/StorageService.js';

export class Sidebar {
    constructor() {
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

        // Check if already subscribed
        if (StorageService.get('newsletter_subscribed')) {
            const btn = form.querySelector('button');
            const input = form.querySelector('input');
            if (btn) {
                btn.textContent = window.i18n ? window.i18n.t('sidebar.newsletter.subscribed') : 'Subscribed';
                btn.disabled = true;
            }
            if (input) input.disabled = true;
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('.newsletter-input');
            const email = input.value;

            // Simple email validation using regex from utils (or inline if not exported)
            const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

            if (isValid) {
                const msg = window.i18n ? window.i18n.t('sidebar.newsletter.success') : 'Successfully subscribed!';
                showToast(msg);
                input.value = '';
                StorageService.set('newsletter_subscribed', 'true');

                const btn = form.querySelector('button');
                btn.textContent = window.i18n ? window.i18n.t('sidebar.newsletter.subscribed') : 'Subscribed';
                btn.disabled = true;
                input.disabled = true;
            } else {
                const msg = window.i18n ? window.i18n.t('sidebar.newsletter.error') : 'Invalid email';
                showToast(msg);
            }
        });
    }
}
