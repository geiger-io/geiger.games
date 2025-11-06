// Apps Page
export class AppsPage {
    async render() {
        return `
            <div class="container-strip">
                <section class="container page">
                    <header>
                        <h1>Apps</h1>
                        <h2>Do you like apps? We do. Passionately. Not because it's the trend, but because they solve real problems. Apps can take the traditional to the innovative, can take the present into the future.</h2>
                    </header>

                    <div class="mobile-demo-tap hide-above-baby">
                        <img id="mobile-img" class="fullwidth-mobile" src="img/book_mobile.png" alt="book_mobile" width="640" height="1248" />
                        <div class="mobile-screens slider">
                            <div class="slides">
                                <img class="slide active" src="img/app-mobile-1.png" alt="app-mobile-1" width="640" height="1260" />
                                <img class="slide" src="img/app-mobile-2.png" alt="app-mobile-2" width="640" height="1154" />
                                <img class="slide" src="img/app-mobile-3.png" alt="app-mobile-3" width="960" height="1704" />
                                <img class="slide" src="img/app-mobile-4.png" alt="app-mobile-4" width="640" height="1136" />
                                <img class="slide" src="img/app-mobile-5.png" alt="app-mobile-5" width="640" height="1136" />
                                <img class="slide" src="img/app-mobile-6.png" alt="app-mobile-6" width="640" height="1136" />
                            </div>
                            <img src="img/scaler.jpg" alt="scaler" width="640" height="1136" />
                        </div>
                    </div>
                    <div id="tablet" class="left half-col hide-baby-below">
                        <img id="tablet-img" src="img/tablet.png" alt="tablet" width="1340" height="1900" />
                        <div class="tablet-screens slider">
                            <div class="slides">
                                <img class="slide active" src="img/app-tablet-1.jpg" alt="app-tablet-1" width="1536" height="2048" />
                                <img class="slide" src="img/app-tablet-2.jpg" alt="app-tablet-2" width="1536" height="2048" />
                                <img class="slide" src="img/app-tablet-3.jpg" alt="app-tablet-3" width="1536" height="2048" />
                                <img class="slide" src="img/app-tablet-4.jpg" alt="app-tablet-4" width="1536" height="2048" />
                                <img class="slide" src="img/app-tablet-5.jpg" alt="app-tablet-5" width="1536" height="2048" />
                            </div>
                            <img src="img/scaler-tablet.jpg" alt="scaler" width="640" height="1136" />
                        </div>
                        <section class="container" id="intro">
                            <span id="hint">Tap the screen, go on, do it</span>
                        </section>
                    </div>

                    <div class="half-col right">
                        <p>When we think of apps, we don't see yet another icon on your device's home-screen, but a solution. The reality is, apps take things further and we like to do that as well with a multi-layered approach. Be that a hybrid app, a native iOS or Android app, we're on it.</p>

                        <p>We turn books, web experiences or even otherwise boring stuff into exciting new, love at first sight applications that are intuitive and easy to use for anyone.</p>

                        <h3>Here's what we've been building lately:</h3>
                        
                        <ul>
                            <li>Interactive map apps</li>
                            <li>Books and book reference apps</li>
                            <li>Game-type apps</li>
                            <li>Real Estate apps</li>
                            <li>Playbooks</li>
                            <li>Companion apps</li>
                        </ul>

                        <p>Functionality and ease of use are equally important, but our apps have a third quality, which is the most important of all. Passion. Each app is done with absolute dedication to its personality and its story. We don't package ideas up into nice little boxes. We think outside the box, build outside the box.</p>

                        <p><i>It's time to breath life into apps, and turn Pinocchio into a real boy.</i></p>
                    </div>
                    <br class="clear"/>
                    <p>&nbsp;</p>
                </section>
            </div>
        `;
    }

    attachEventListeners() {
        // Mobile gallery slider
        const slides = document.querySelectorAll('.mobile-screens .slide, .tablet-screens .slide');
        slides.forEach(slide => {
            slide.addEventListener('click', () => {
                const parent = slide.closest('.slides');
                const allSlides = Array.from(parent.querySelectorAll('.slide'));
                const currentIndex = allSlides.indexOf(slide);
                const nextIndex = (currentIndex + 1) % allSlides.length;
                
                slide.style.zIndex = '9';
                slide.style.opacity = '0';
                
                setTimeout(() => {
                    allSlides.forEach(s => {
                        s.classList.remove('active');
                        s.style.display = 'none';
                    });
                    
                    allSlides[nextIndex].classList.add('active');
                    allSlides[nextIndex].style.display = 'block';
                    allSlides[nextIndex].style.zIndex = '10';
                    allSlides[nextIndex].style.opacity = '1';
                    
                    slide.style.zIndex = '5';
                }, 500);
            });
        });

        // Standard gallery (if using responsiveSlides)
        if (typeof responsiveSlides !== 'undefined') {
            const standardGallery = document.querySelector('.standard-gallery');
            if (standardGallery) {
                responsiveSlides({
                    auto: false,
                    pager: false,
                    nav: true,
                    speed: 500
                });
            }
        }
    }
}

