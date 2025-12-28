import { StorageService } from './StorageService.js';
import { validateEmail } from '../utils.js';

export class NewsletterService {
    constructor() {
        this.STORAGE_KEY = 'newsletter_subscribed';
    }

    /**
     * Subscribe to the newsletter
     * @param {string} email 
     * @returns {Promise<Object>} { success: boolean, message: string }
     */
    async subscribe(email) {
        return new Promise((resolve) => {
            // Simulate API latency
            setTimeout(() => {
                if (!validateEmail(email)) {
                    resolve({ success: false, message: 'Invalid email address.' });
                    return;
                }

                // Check for duplicate (local simulation)
                const alreadySubscribed = StorageService.get(this.STORAGE_KEY + '_' + email);
                if (alreadySubscribed) {
                    resolve({ success: false, message: 'You are already subscribed!' });
                    return;
                }

                // "API" Success
                StorageService.set(this.STORAGE_KEY + '_' + email, 'true');
                resolve({ success: true, message: 'Successfully subscribed!' });
            }, 800);
        });
    }
}
