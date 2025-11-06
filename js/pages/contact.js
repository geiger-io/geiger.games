// Contact Page
export class ContactPage {
    async render() {
        return `
            <div class="container-strip">
                <section class="container page">
                    <header>
                        <h1>Contact</h1>
                        <h2>Got a project we can help you with? Please get in touch, perhaps we can work together.</h2>
                    </header>
                    
                    <div class="half-col left">
                        <h3>Email and Telephone</h3>
                        <p><strong>E: </strong><a href="mailto:info@geiger.io" title="Email">info@geiger.io</a></p>
                        <p><strong>T: </strong>+44 (0) 2895 814 742</p>
                        
                        <h3>Address</h3>
                        <p>Geiger<br>
                        Caulfield House<br>
                        11-13 Catherine Street, Newry<br>
                        BT35 6BE</p>
                        
                        <small>
                        © GEIGER GAMING TECHNOLOGIES LTD, A PRIVATE COMPANY LIMITED BY SHARES. INCORPORATED AND REGISTERED IN NORTHERN IRELAND WITH COMPANY NUMBER NI630968.
                        </small>
                    </div>
                    
                    <iframe id="contact-map" class="fullwidth-mobile" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18684.5451555485!2d-6.3335276!3d54.17001325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48603324bd84270b%3A0x56524042ae2d6707!2sNewry%2C+Newry+and+Mourne+BT34!5e0!3m2!1sen!2suk!4v1432553032957" width="800" height="600" frameborder="0" style="border:0"></iframe>
                </section>
            </div>
        `;
    }
}

