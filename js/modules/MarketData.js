import { MarketService } from '../services/MarketService.js';
import { formatNumber, showToast } from '../utils.js';

const COIN_MAP = {
    'bitcoin': { name: 'Bitcoin', symbol: 'BTC', icon: '₿' },
    'ethereum': { name: 'Ethereum', symbol: 'ETH', icon: 'Ξ' },
    'solana': { name: 'Solana', symbol: 'SOL', icon: '◎' },
    'cardano': { name: 'Cardano', symbol: 'ADA', icon: '₳' }
};

export class MarketData {
    constructor() {
        this.tickerContainer = document.getElementById('crypto-ticker');
        this.service = new MarketService();
        this.init();
    }

    async init() {
        try {
            await this.updateMarketData();
        } catch (error) {
            console.error('Initial market data fetch failed:', error);
        }

        // Update every 60 seconds (conservative for free tier)
        setInterval(() => this.updateMarketData(), 60000);

        // Update timestamp independently
        this.updateTimestamp();
        setInterval(() => this.updateTimestamp(), 1000);
    }

    async updateMarketData() {
        const data = await this.service.getMarketData();
        if (data) {
            this.renderTicker(data);
            this.updateTimestamp();
        }
    }

    updateTimestamp() {
        const el = document.getElementById('market-updated');
        if (el) {
            const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            el.textContent = `${window.i18n ? window.i18n.t('market.last_updated') : 'Updated'}: ${now}`;
        }
    }

    renderTicker(data) {
        if (!this.tickerContainer || !data) return;

        // Transform API data object -> Array of UI objects
        const coins = Object.keys(COIN_MAP).map(id => {
            const apiData = data[id];
            const meta = COIN_MAP[id];

            if (!apiData) return null;

            return {
                ...meta,
                price: apiData.usd,
                change: apiData.usd_24h_change || 0
            };
        }).filter(item => item !== null);

        // Duplicate data to create seamless loop
        const tickerItems = [...coins, ...coins, ...coins, ...coins]
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
                <span class="ticker-price">$${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                <span class="ticker-change ${changeClass}">${changeSign}${coin.change.toFixed(2)}%</span>
            </div>
        `;
    }
}
