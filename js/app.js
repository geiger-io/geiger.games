// Modern JavaScript Application
import { Router } from './router.js';
import { Header } from './components/header.js';
import { Footer, loadPlugins } from './components/footer.js';
import { HomePage } from './pages/home.js';
import { AppsPage } from './pages/apps.js';
import { BooksPage } from './pages/books.js';
import { WebPage } from './pages/web.js';
import { ContactPage } from './pages/contact.js';
import { NewsPage } from './pages/news.js';

class App {
    constructor() {
        this.router = new Router();
        this.header = new Header();
        this.footer = new Footer();
        // Expose app instance globally for navigation
        window.app = this;
        this.init();
    }

    init() {
        // Register routes
        this.router.addRoute('/', () => this.renderPage(HomePage));
        this.router.addRoute('/apps', () => this.renderPage(AppsPage));
        this.router.addRoute('/books', () => this.renderPage(BooksPage));
        this.router.addRoute('/web', () => this.renderPage(WebPage));
        this.router.addRoute('/contact', () => this.renderPage(ContactPage));
        this.router.addRoute('/news', () => this.renderPage(NewsPage));

        // Load plugins first
        loadPlugins().then(() => {
            // Render header and footer
            this.renderHeader();
            this.renderFooter();

            // Handle initial route
            this.router.handleRoute();
            
            // Handle browser navigation
            window.addEventListener('popstate', () => {
                this.router.handleRoute();
            });
        });
    }

    renderHeader() {
        const headerContainer = document.getElementById('app');
        const headerHTML = this.header.render();
        headerContainer.insertAdjacentHTML('afterbegin', headerHTML);
        this.header.attachEventListeners();
    }

    renderFooter() {
        const footerContainer = document.getElementById('app');
        const footerHTML = this.footer.render();
        footerContainer.insertAdjacentHTML('beforeend', footerHTML);
    }

    async renderPage(PageClass) {
        const app = document.getElementById('app');
        const mainContent = app.querySelector('main');
        
        if (mainContent) {
            mainContent.remove();
        }

        const page = new PageClass();
        const pageHTML = await page.render();
        
        const main = document.createElement('main');
        main.innerHTML = pageHTML;
        const footer = app.querySelector('footer');
        if (footer) {
            app.insertBefore(main, footer);
        } else {
            app.appendChild(main);
        }
        
        // Attach event listeners after a short delay to ensure DOM is ready
        setTimeout(() => {
            if (page.attachEventListeners) {
                page.attachEventListeners();
            }
        }, 0);
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new App());
} else {
    new App();
}

