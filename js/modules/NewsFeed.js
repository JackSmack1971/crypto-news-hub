import { newsArticles, categoryNames } from '../../data.js';
import { showToast, escapeRegex } from '../utils.js';
import { ArticleModal } from './ArticleModal.js';

export class NewsFeed {
    constructor() {
        this.articles = newsArticles;
        this.currentFilter = 'all';
        this.newsGrid = document.getElementById('news-grid');
        this.loadMoreBtn = document.getElementById('load-more-btn');
        this.searchInput = document.getElementById('search-input');
        this.searchResults = document.getElementById('search-results');

        this.modal = new ArticleModal(); // Init Modal

        this.init();
    }

    init() {
        this.page = 1;
        this.itemsPerPage = 6;
        this.renderNews();
        this.setupCategoryFilters();
        this.setupLoadMore();
        this.setupSearch();
    }

    renderNews(articles = this.articles, append = false) {
        if (!this.newsGrid) return;

        // If not appending (i.e. first load or filter change), clear grid
        if (!append) {
            this.newsGrid.innerHTML = '';
            this.currentDisplayArticles = articles; // Store filtered set
        } else {
            // If appending, ensure we use the current stored set
            articles = this.currentDisplayArticles || this.articles;
        }

        if (articles.length === 0) {
            this.newsGrid.innerHTML = `<div class="no-results">${window.i18n ? window.i18n.t('news_feed.no_results') : 'No articles found'}</div>`;
            if (this.loadMoreBtn) this.loadMoreBtn.style.display = 'none';
            return;
        }

        // Calculate slice
        // If append is false, we render page 1.
        // If append is true, we calculate strictly the new slice based on this.page

        let start = append ? (this.page - 1) * this.itemsPerPage : 0;
        let end = this.page * this.itemsPerPage;

        // Safety: don't render what's already there if not appending? 
        // Logic fix: renderNews usually renders *everything* up to now? 
        // No, standard "Load More" appends a *new* block.

        const slice = articles.slice(start, end);

        slice.forEach((article, index) => {
            const card = document.createElement('article');
            card.className = 'news-card';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';

            card.innerHTML = `
                <div class="news-card-image">
                    <img src="${article.image}" alt="${article.title}" loading="lazy">
                </div>
                <div class="news-card-content">
                    <span class="news-card-category">${categoryNames[article.category] || article.category}</span>
                    <h3 class="news-card-title">${article.title}</h3>
                    <p class="news-card-excerpt">${this.formatExcerpt(article.excerpt)}</p>
                    <div class="news-card-meta">
                        <span class="news-card-author">${article.author}</span>
                        <span class="news-card-date">${article.date}</span>
                        <span class="news-card-read-time">${article.readTime}</span>
                    </div>
                </div>
            `;

            card.addEventListener('click', (e) => {
                // Prevent interfering with other interactions if any
                this.modal.open(article);
            });

            this.newsGrid.appendChild(card);

            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });

        // Manage Load More Button Visibility
        if (this.loadMoreBtn) {
            if (end >= articles.length) {
                this.loadMoreBtn.style.display = 'none';
                // Optional: Show "No more" text?
            } else {
                this.loadMoreBtn.style.display = 'block';
                this.loadMoreBtn.textContent = window.i18n ? window.i18n.t('news_feed.load_more') : 'Load More Articles';
                this.loadMoreBtn.disabled = false;
            }
        }
    }

    setupCategoryFilters() {
        const filterBtns = document.querySelectorAll('.filter-chip, .nav-link, .footer-link-list a[data-i18n^="nav."]');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                let category = btn.getAttribute('data-category');
                if (!category) return;
                this.setCategory(category);
            });
        });
    }

    setCategory(category) {
        this.currentFilter = category;
        this.page = 1; // Reset page on filter

        document.querySelectorAll('.filter-chip, .nav-link').forEach(el => {
            if (el.getAttribute('data-category') === category) {
                el.classList.add('active');
            } else {
                el.classList.remove('active');
            }
        });

        const filtered = category === 'all'
            ? this.articles
            : this.articles.filter(a => a.category === category);

        // reset and render page 1
        this.renderNews(filtered, false);
    }

    setupLoadMore() {
        if (this.loadMoreBtn) {
            this.loadMoreBtn.addEventListener('click', () => {
                this.loadMoreBtn.disabled = true;
                this.loadMoreBtn.textContent = window.i18n ? window.i18n.t('news_feed.loading') : 'Loading...';

                setTimeout(() => {
                    this.page++;
                    // We pass true to append
                    this.renderNews(null, true);
                    this.loadMoreBtn.disabled = false;
                }, 600); // reduced delay for better UX
            });
        }
    }

    setupSearch() {
        if (!this.searchInput || !this.searchResults) return;

        let debounceTimer;

        this.searchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                const query = e.target.value.trim().toLowerCase();

                if (query.length < 2) {
                    this.searchResults.classList.remove('active');
                    return;
                }

                const results = this.articles.filter(article =>
                    article.title.toLowerCase().includes(query) ||
                    article.excerpt.toLowerCase().includes(query) ||
                    article.category.toLowerCase().includes(query)
                ).slice(0, 6);

                this.renderSearchResults(results, query);
            }, 300);
        });

        // Close search on click outside
        document.addEventListener('click', (e) => {
            if (!this.searchInput.contains(e.target) && !this.searchResults.contains(e.target)) {
                this.searchResults.classList.remove('active');
            }
        });
    }

    renderSearchResults(results, query) {
        if (results.length > 0) {
            this.searchResults.innerHTML = results.map(article => `
                <div class="search-result-item" data-id="${article.id}">
                    <div class="search-result-title">${this.highlightMatch(article.title, query)}</div>
                    <div class="search-result-category">${categoryNames[article.category] || article.category}</div>
                </div>
            `).join('');
            this.searchResults.classList.add('active');

            // Click handler for results
            this.searchResults.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', () => {
                    const article = this.articles.find(a => a.id === parseInt(item.dataset.id));
                    if (article) {
                        this.modal.open(article);
                        this.searchInput.value = '';
                        this.searchResults.classList.remove('active');
                    }
                });
            });
        } else {
            this.searchResults.innerHTML = `<div class="search-result-item"><div class="search-result-title">${window.i18n ? window.i18n.t('news_feed.search_no_results') : 'No results found. Try different keywords.'}</div></div>`;
            this.searchResults.classList.add('active');
        }
    }

    highlightMatch(text, query) {
        const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }
    formatExcerpt(text) {
        const terms = {
            'DeFi': 'Decentralized Finance',
            'NFT': 'Non-Fungible Token',
            'DAO': 'Decentralized Autonomous Organization',
            'HODL': 'Hold On for Dear Life'
        };

        let formatted = text;
        Object.keys(terms).forEach(term => {
            const regex = new RegExp(`\\b${term}\\b`, 'g');
            formatted = formatted.replace(regex, `<span class="glossary-term" data-tooltip="${terms[term]}">${term}</span>`);
        });
        return formatted;
    }
}
