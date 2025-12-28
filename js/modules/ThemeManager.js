import { StorageService } from '../services/StorageService.js';
import { showToast } from '../utils.js';

export class ThemeManager {
    constructor() {
        this.themeToggleBtn = document.getElementById('theme-toggle');
        this.init();
    }

    init() {
        // Load saved theme or system preference
        const savedTheme = StorageService.get('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
        this.setTheme(initialTheme);

        // Event Listeners
        if (this.themeToggleBtn) {
            this.themeToggleBtn.addEventListener('click', () => this.toggleTheme());
        }
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme, true);
    }

    setTheme(theme, notify = false) {
        document.documentElement.setAttribute('data-theme', theme);
        StorageService.set('theme', theme);

        if (notify) {
            // Check if i18n is available (it might be loaded globally)
            const message = window.i18n ? window.i18n.t('messages.theme_switched', { theme: theme }) : `Switched to ${theme} mode`;
            showToast(message);
        }
    }
}
