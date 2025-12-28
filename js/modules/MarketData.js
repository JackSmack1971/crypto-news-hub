import { cryptoData } from '../../data.js';
import { formatNumber, showToast } from '../utils.js';

export class MarketData {
    constructor() {
        this.tickerContainer = document.getElementById('crypto-ticker');
        this.init();
    }

    init() {
        this.renderTicker();
        this.setupTimeframeButtons();
        this.updateTimestamp();

        // Simulate real-time updates
        setInterval(() => {
            this.updatePrices();
            this.updateTimestamp();
        }, 30000);
    }

    updateTimestamp() {
        const el = document.getElementById('market-updated');
        if (el) {
            const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            el.textContent = `${window.i18n ? window.i18n.t('market.last_updated') : 'Updated'}: ${now}`;
        }
    }

    renderTicker() {
        if (!this.tickerContainer) return;

        // Duplicate data to create seamless loop
        const tickerItems = [...cryptoData, ...cryptoData, ...cryptoData, ...cryptoData, ...cryptoData]
            .map(coin => this.createTickerItem(coin))
            .join('');

        this.tickerContainer.innerHTML = tickerItems;
    }

    createTickerItem(coin) {
        const isPositive = coin.change >= 0;
        const changeClass = isPositive ? 'positive' : 'negative';
        const changeSign = isPositive ? '+' : '';

        return `
            <div class="ticker-item">
                <span class="ticker-symbol">${coin.icon} ${coin.symbol}</span>
                <span class="ticker-price">$${coin.price.toLocaleString()}</span>
                <span class="ticker-change ${changeClass}">${changeSign}${coin.change}%</span>
            </div>
        `;
    }

    setupTimeframeButtons() {
        const buttons = document.querySelectorAll('.timeframe-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const period = btn.dataset.period;
                this.simulateDataUpdate(period);
            });
        });
    }

    simulateDataUpdate(period) {
        const multipliers = { '24h': 1, '7d': 1.05, '30d': 1.12 };
        const multiplier = multipliers[period] || 1;

        // Update DOM elements if they exist
        const capEl = document.getElementById('total-market-cap');
        const volEl = document.getElementById('volume-24h');

        if (capEl) capEl.textContent = `$${(2.45 * multiplier).toFixed(2)}T`;
        if (volEl) volEl.textContent = `$${(98.2 * multiplier).toFixed(1)}B`;

        // Randomize change indicator for demo effect
        const changeEl = document.querySelector('.market-stats .stat-card:first-child .stat-change');
        if (changeEl) {
            const change = ((Math.random() - 0.3) * 5).toFixed(2);
            changeEl.textContent = `${change > 0 ? '+' : ''}${change}%`;
            changeEl.className = `stat-change ${change > 0 ? 'positive' : 'negative'}`;
        }

        showToast(`Showing ${period} data`);
    }

    updatePrices() {
        // Random price fluctuation for ticker
        const items = document.querySelectorAll('.ticker-price');
        items.forEach(item => {
            const currentPrice = parseFloat(item.textContent.replace('$', '').replace(/,/g, ''));
            const variance = (Math.random() - 0.5) * 0.01; // 1% variance
            const newPrice = currentPrice * (1 + variance);
            item.textContent = `$${newPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

            // Flash effect could be added here
        });
    }
}
