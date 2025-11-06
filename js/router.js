// Simple JavaScript Router
export class Router {
    constructor() {
        this.routes = [];
    }

    addRoute(path, handler) {
        this.routes.push({ path, handler });
    }

    navigate(path) {
        window.history.pushState({}, '', path);
        this.handleRoute();
    }

    handleRoute() {
        const path = window.location.pathname;
        const route = this.routes.find(r => {
            if (r.path === '/') {
                return path === '/' || path === '/index.html';
            }
            return path === r.path || path.startsWith(r.path + '/');
        });

        if (route) {
            route.handler();
        } else {
            // Default to home
            const homeRoute = this.routes.find(r => r.path === '/');
            if (homeRoute) {
                homeRoute.handler();
            }
        }
    }
}

