// News Page
export class NewsPage {
    async render() {
        try {
            // Fetch the Jekyll-generated news HTML
            const response = await fetch('/news/');
            if (!response.ok) throw new Error('Failed to load news');
            
            const html = await response.text();
            
            // Extract the main content from the Jekyll page
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Get the news content from the container page wrapper
            const pageContent = doc.querySelector('.container.page .home');
            
            if (pageContent) {
                return `
                    <div class="container-strip">
                        <section class="container page">
                            ${pageContent.innerHTML}
                        </section>
                    </div>
                `;
            }
            
            // Fallback if content structure changes
            return `
                <div class="container-strip">
                    <section class="container page">
                        <h1>News</h1>
                        <p>Unable to load news content. <a href="/news/">View news page</a></p>
                    </section>
                </div>
            `;
        } catch (error) {
            console.error('Error loading news:', error);
            return `
                <div class="container-strip">
                    <section class="container page">
                        <h1>News</h1>
                        <p>Unable to load news content. <a href="/news/">View news page</a></p>
                    </section>
                </div>
            `;
        }
    }
}

