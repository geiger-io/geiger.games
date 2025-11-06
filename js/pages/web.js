// Web/Crowdfunding Page
export class WebPage {
    async render() {
        return `
            <div class="container-strip">
                <section class="container page">
                    <header>
                        <h1>Crowdfunding</h1>
                        <h2>Because the campaign doesn't end with Kickstarter</h2>
                    </header>
                    
                    <div class="standard-gallery-container">
                        <ul class="rslides standard-gallery" id="slider4">
                            <li>
                                <img src="img/web-desktop-1.jpg" alt="web-desktop-1" width="1280" height="900" />
                            </li>
                            <li>
                                <img src="img/web-desktop-2.jpg" alt="web-desktop-2" width="1280" height="900" />
                            </li>
                            <li>
                                <img src="img/web-desktop-4.jpg" alt="web-desktop-4" width="1280" height="900" />
                            </li>
                            <li>
                                <img src="img/web-desktop-5.jpg" alt="web-desktop-4" width="1280" height="900" />
                            </li>
                        </ul>
                    </div>
                    <p>Introducing <b>Pledgehammer</b>, the only tool you need to manage backers, products and shipping.</p>

                    <div class="half-col left">
                        <h3>Complex product combinations</h3>
                        <p>Perfect for complex stretch goals.</p>
                        <h3>Weight based shipping calculator</h3>
                        <p>Including support for international shipments.</p>
                        <h3>Inventory management</h3>
                        <p> Track every component, get live reports on accurate quantity information.</p> 
                        <h3>Addon Store</h3>
                        <p>Full ecommerce store, with support for full size images letting you up-sell and cross sell products.</p>
                        <h3>Reports</h3>
                        <p>Stock, products, orders, customer invoices and more!</p> 
                    </div>
                    <div class="half-col offset-col right">
                        <h3>Customer order tracking</h3>
                        <p>Including invoices and email notification.</p>

                        <h3>Addon Payments</h3>
                        <p>Let customers add to their pledge with support for Stripe and PayPal payment.</p> 
                        <h3>Automatic Reminder emails</h3>
                        <p>Get in touch with backers who haven't confirmed their address.</p>
                        <h3>Never too late</h3>
                        <p>Add backers who missed the campaign or had trouble with Kickstarter payment systems.</p> 
                        <h3>EU Digital VAT</h3>
                        <p>Complying with EU VAT directives on digital sales.</p> 
                    </div>
                    <br class="clear"/>
                    <p></p>
                </section>
            </div>
        `;
    }

    attachEventListeners() {
        // Standard gallery using jQuery responsiveSlides
        if (typeof jQuery !== 'undefined' && jQuery.fn.responsiveSlides) {
            const standardGallery = jQuery('.standard-gallery');
            if (standardGallery.length) {
                standardGallery.responsiveSlides({
                    auto: false,
                    pager: false,
                    nav: true,
                    speed: 500
                });
            }
        }
    }
}

