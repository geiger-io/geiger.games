// Footer Component
export class Footer {
    render() {
        return `
            <footer>
                <script>
                    ((window.gitter = {}).chat = {}).options = {
                        room: 'geiger-io/geiger'
                    };
                </script>
                <script src="https://sidecar.gitter.im/dist/sidecar.v1.js" async defer></script>

                <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
                <script>
                    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

                    ga('create', 'UA-47517435-3', 'auto');
                    ga('send', 'pageview');
                </script>
            </footer>
        `;
    }
}

// Load plugins.js dynamically
export function loadPlugins() {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'js/plugins.js';
        script.onload = () => resolve();
        document.head.appendChild(script);
    });
}

