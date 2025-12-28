// Main Application Entry Point
import { ThemeManager } from './js/modules/ThemeManager.js';
import { MarketData } from './js/modules/MarketData.js';
import { NewsFeed } from './js/modules/NewsFeed.js';
import { MobileMenu } from './js/modules/MobileMenu.js';
import { Sidebar } from './js/modules/Sidebar.js';

console.log('Starting app initialization...');

// 1. Initialize i18n (Global) - Wait for it if it's async
if (window.i18n) {
    await window.i18n.init();
} else {
    console.warn('i18n module not found on window');
}

// 2. Initialize Modules
const themeManager = new ThemeManager();
const marketData = new MarketData();
const newsFeed = new NewsFeed();
const mobileMenu = new MobileMenu();
const sidebar = new Sidebar();

// 3. Global Header Scroll Effect
// Keep this simple logic here as it's global layout behavior
let lastScrollY = 0;
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (!header) return;

    const currentScrollY = window.scrollY;

    if (currentScrollY > 50) {
        header.style.background = 'var(--bg-primary)';
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = 'none';
        header.style.borderBottom = '1px solid var(--border-color)';
    }

    lastScrollY = currentScrollY;
});

console.log('CryptoSphere App Initialized (Modular)');
