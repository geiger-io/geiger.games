// Footer Component
export class Footer {
    render() {
        return `
            <footer id="footer">
                <section id="info">
                    <p>Operated by Úir Consulting Ltd, registered in Northern Ireland as NI662497</p>
                </section>
                <script>
                    ((window.gitter = {}).chat = {}).options = {
                        room: 'geiger-io/geiger'
                    };
                </script>
                <script src="https://sidecar.gitter.im/dist/sidecar.v1.js" async defer></script>
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

