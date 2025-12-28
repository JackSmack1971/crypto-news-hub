export class ArticleModal {
    constructor() {
        this.renderOverlay();
        this.overlay = document.querySelector('.modal-overlay');
        this.closeBtn = document.querySelector('.modal-close');
        this.contentContainer = document.querySelector('.modal-body');
        this.titleContainer = document.querySelector('.modal-title');
        this.imageContainer = document.querySelector('.modal-image');
        this.metaContainer = document.querySelector('.modal-meta');

        this.bindEvents();
    }

    renderOverlay() {
        if (document.querySelector('.modal-overlay')) return;

        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" aria-label="Close modal">&times;</button>
                <div class="modal-header">
                    <img class="modal-image" src="" alt="">
                    <h2 class="modal-title"></h2>
                    <div class="modal-meta"></div>
                </div>
                <div class="modal-body"></div>
            </div>
        `;
        document.body.appendChild(overlay);
    }

    bindEvents() {
        this.closeBtn.addEventListener('click', () => this.close());
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.close();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) this.close();
        });
    }

    open(article) {
        this.titleContainer.textContent = article.title;
        this.imageContainer.src = article.image;
        this.imageContainer.alt = article.title;

        // SECURITY NOTE: The following innerHTML usage assumes 'article.content' is safe (currently mock data).
        // CRITICAL: When integrating a real backend/CMS, this content MUST be sanitized (e.g., using DOMPurify) 
        // to prevent Cross-Site Scripting (XSS) attacks.
        this.contentContainer.innerHTML = article.content || `
            <p class="modal-excerpt">${article.excerpt}</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        `;

        this.metaContainer.innerHTML = `
            <span>By ${article.author}</span>
            <span>${article.date}</span>
            <span>${article.readTime} read</span>
        `;

        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        this.isOpen = true;
    }

    close() {
        this.overlay.classList.remove('active');
        document.body.style.overflow = '';
        this.isOpen = false;
    }
}
