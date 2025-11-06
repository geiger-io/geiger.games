// News Page
export class NewsPage {
    async render() {
        // Redirect to the Jekyll-generated news page
        window.location.href = '/news/';
        return '<div class="container-strip"><section class="container page"><p>Loading news...</p></section></div>';
    }
}

