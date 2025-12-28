import { StorageService } from './StorageService.js';

export class MarketService {
    constructor() {
        this.API_URL = 'https://api.coingecko.com/api/v3/simple/price';
        this.CACHE_KEY = 'market_data_v1';
        this.CACHE_TTL = 300; // 5 minutes in seconds
        this.isFetching = false;

        // Default IDs to fetch. Hardcoded for now.
        this.coinIds = 'bitcoin,ethereum,solana,cardano';
        this.currencies = 'usd';
    }

    /**
     * Get market data. Checks cache first, then API.
     * @returns {Promise<Object>} Market data map { bitcoin: { usd: 50000, usd_24h_change: 2.5 } }
     */
    async getMarketData() {
        // 1. Check Cache
        const cached = StorageService.getWithTTL(this.CACHE_KEY);
        if (cached) {
            console.log('[MarketService] Cache hit');
            return cached;
        }

        // 2. Fetch API
        if (this.isFetching) {
            // Simple prevention of parallel requests
            return null;
        }

        try {
            this.isFetching = true;
            console.log('[MarketService] Fetching from CoinGecko...');

            const url = `${this.API_URL}?ids=${this.coinIds}&vs_currencies=${this.currencies}&include_24hr_change=true`;
            const response = await fetch(url);

            if (!response.ok) {
                if (response.status === 429) {
                    console.warn('[MarketService] Rate limit hit (429). Using stale/mock data if available.');
                    return this.getFallbackData();
                }
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();

            // 3. Save to Cache
            StorageService.setWithTTL(this.CACHE_KEY, data, this.CACHE_TTL);

            return data;
        } catch (e) {
            console.error('[MarketService] Fetch failed:', e);
            return this.getFallbackData();
        } finally {
            this.isFetching = false;
        }
    }

    getFallbackData() {
        // Try to get Expired data if we updated getWithTTL to allow returning expired?
        // For now, return null or a distinct error object to let the UI decide?
        // Or simpler: Return mocked "stale" data so the UI doesn't break.
        return null;
    }
}
