// Books Page
export class BooksPage {
    async render() {
        return `
            <div class="container-strip">
                <section class="container page">
                    <header>
                        <h1>Books</h1>
                        <h2>We love books, we love reading books, smelling books, making books. Most of all we love making books be more.</h2>
                    </header>
                    <div id="tablet" class="left half-col hide-baby-below">
                        <img id="tablet-img" src="img/tablet.png" alt="tablet" width="1340" height="1900" />
                        <div id="reader">
                            <img src="img/jaws.jpg" alt="jaws" width="1124" height="4492" />
                        </div>
                    </div>
                    <div class="half-col right">
                        <p>Physical books are fantastic and its very hard for a digital version to compete. Our goal is to craft a digital reading experience thats not just a conversion of a print book, but a reimagining.  Some of our ideas include: Pop-up glossary terms, header searches, re-orderable table of contents, favourite pages, standalone book companion apps and book streaming.</p>

                        <p>We believe that digital books should be easier to use and more useful than real books. Currently the industry has focused on portability of digital books but have neglected enhancing the reading experience. This is especially a problem when it comes to reference books.</p>

                        <p>What's the digital equivalent of sticking your finger in a page while you flick to several others?</p>

                        <p>What if large reference books could be chopped up, reordered, personalised to your individual needs?</p>

                        <p>What if all your bookmarked pages from several related books could all be colated together as a new book?</p>

                        <p>These are the types of questions we are solving today.</p>
                        <img class="fullwidth-mobile hide-above-baby" src="img/book_mobile.png" alt="book_mobile" width="640" height="1248" />
                    </div>
                    <br class="clear"/>
                    <header>
                        <h1>&#8220;Post Book&#8221;</h1>
                        <h2>Post book, is a term we keep jokingly throwing around the office but we are semi serious. We are looking at new non-linear ways of presenting and consuming book contents.</h2>
                    </header>
                    
                    <p>These "post books", or Apps as you might call them are an attempt to make reference material more accessible, faster to use and within a context which better explains their concepts.</p>
                    
                    <video class="fullwidth-mobile" poster="video/mantica-map-poster.jpg" controls>
                        <source src="video/mantica-map-web.mp4" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </section>
            </div>
        `;
    }
}

