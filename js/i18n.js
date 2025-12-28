/**
 * Simple Vanilla JS i18n Loader
 * Loads a JSON file and replaces content in elements with data-i18n attributes.
 */
class I18n {
    constructor(lang = 'en') {
        this.lang = lang;
        this.translations = {};
    }

    async init() {
        try {
            const response = await fetch(`locales/${this.lang}.json`);
            if (!response.ok) throw new Error(`Failed to load ${this.lang} translations`);
            this.translations = await response.json();
            this.updatePage();
            console.log(`i18n initialized: ${this.lang}`);
        } catch (error) {
            console.error('i18n init error:', error);
        }
    }

    /**
     * Get a translation by dotted key (e.g., 'home.title')
     * @param {string} key 
     * @param {object} params Optional parameters to replace {param} in string
     */
    t(key, params = {}) {
        const keys = key.split('.');
        let value = this.translations;
        
        for (const k of keys) {
            value = value[k];
            if (!value) return key; // Fallback to key if not found
        }

        if (typeof value !== 'string') return key;

        // Replace params
        Object.keys(params).forEach(param => {
            value = value.replace(`{${param}}`, params[param]);
        });

        return value;
    }

    /**
     * Update all elements with data-i18n attribute
     */
    updatePage() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            
            // If input/textarea, set placeholder or value
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                if (element.hasAttribute('placeholder')) {
                    element.setAttribute('placeholder', translation);
                }
            } else {
                element.textContent = translation;
            }
        });
    }
}

// Expose global instance
window.i18n = new I18n();
// Auto-init
// window.i18n.init(); // We will call this manually in app.js or script tag
