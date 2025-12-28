export class MobileMenu {
    constructor() {
        this.menuToggle = document.querySelector('.mobile-menu-toggle');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.init();
    }

    init() {
        if (!this.menuToggle || !this.mobileMenu) return;

        this.menuToggle.addEventListener('click', () => {
            this.mobileMenu.classList.toggle('active');
            const isActive = this.mobileMenu.classList.contains('active');
            this.menuToggle.setAttribute('aria-expanded', isActive);
        });

        // Close menu when clicking links
        this.mobileMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                this.mobileMenu.classList.remove('active');
            });
        });

        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.mobileMenu.classList.contains('active')) {
                this.mobileMenu.classList.remove('active');
            }
        });
    }
}
