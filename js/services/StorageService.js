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
}
