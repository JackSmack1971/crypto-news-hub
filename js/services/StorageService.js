/**
 * StorageService - Facade for localStorage
 */
export class StorageService {
    static get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item !== null ? item : defaultValue;
        } catch (e) {
            console.warn(`Error reading ${key} from storage`, e);
            return defaultValue;
        }
    }

    static set(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            console.warn(`Error writing ${key} to storage`, e);
        }
    }

    static remove(key) {
        localStorage.removeItem(key);
    }

    /**
     * Set item with Time-To-Live (TTL)
     * @param {string} key 
     * @param {any} value 
     * @param {number} ttlInSeconds 
     */
    static setWithTTL(key, value, ttlInSeconds) {
        const now = new Date();
        const item = {
            value: value,
            expiry: now.getTime() + (ttlInSeconds * 1000)
        };
        this.set(key, JSON.stringify(item));
    }

    /**
     * Get item if not expired
     * @param {string} key 
     * @returns {any|null} value or null if expired/missing
     */
    static getWithTTL(key) {
        const itemStr = this.get(key);
        if (!itemStr) return null;

        try {
            const item = JSON.parse(itemStr);
            const now = new Date();

            if (now.getTime() > item.expiry) {
                this.remove(key);
                return null;
            }
            return item.value;
        } catch (e) {
            return null;
        }
    }
}
