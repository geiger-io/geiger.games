// Header Component
export class Header {
    render() {
        return `
            <header id="top-bar">
                <section id="branding">
                    <a href="/" data-navigate title=""><img src="img/geiger-logo.png" alt="geiger_logo" width="342" height="30"></a>
                </section>
                <nav id="main-nav">
                    <button id="menu-link" type="button" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="main-nav-menu" data-menu-toggle><i class="fa fa-bars" aria-hidden="true"></i></button>
                    <ul id="main-nav-menu" style="display: none;" role="menu">
                        <li id="home" role="none"><a href="/" data-navigate title="Homepage" role="menuitem">Home</a></li>
                        <li id="apps" role="none"><a href="/apps" data-navigate title="Apps Page" role="menuitem">Apps</a></li>
                        <li id="books" role="none"><a href="/books" data-navigate title="Books Page" role="menuitem">Books</a></li>
                        <li id="web" role="none"><a href="/web" data-navigate title="Web Projects" role="menuitem">Crowdfunding</a></li>
                        <li id="news" role="none"><a href="/news" data-navigate title="News" role="menuitem">News</a></li>
                        <li id="support" role="none"><a href="https://github.com/geiger-io/geiger.games/issues?q=state%3Aopen%20label%3Aearworm" title="Support" role="menuitem">Support</a></li>
                        <li id="contact" role="none"><a href="/contact" data-navigate title="Contact Page" role="menuitem">Contact</a></li>
                    </ul>
                </nav>
            </header>
        `;
    }

    attachEventListeners() {
        // Initialize menu as closed
        const nav = document.getElementById('main-nav');
        const navList = nav.querySelector('ul');
        const menuLink = document.getElementById('menu-link');
        
        // Ensure menu starts closed with proper ARIA attributes
        if (navList) {
            navList.style.display = 'none';
        }
        if (nav) {
            nav.classList.remove('active');
        }
        if (menuLink) {
            menuLink.classList.remove('active');
            menuLink.setAttribute('aria-expanded', 'false');
        }

        // Navigation links
        document.querySelectorAll('[data-navigate]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                if (href && href !== '#') {
                    window.app.router.navigate(href);
                }
            });
        });

        // Menu toggle
        if (menuLink) {
            menuLink.addEventListener('click', (e) => {
                e.preventDefault();
                const nav = document.getElementById('main-nav');
                const navList = nav.querySelector('ul');
                const isActive = nav.classList.contains('active');

                if (isActive) {
                    navList.style.display = 'none';
                    nav.classList.remove('active');
                    menuLink.classList.remove('active');
                    menuLink.setAttribute('aria-expanded', 'false');
                } else {
                    navList.style.display = 'block';
                    nav.classList.add('active');
                    menuLink.classList.add('active');
                    menuLink.setAttribute('aria-expanded', 'true');
                }
            });
        }
    }
}

