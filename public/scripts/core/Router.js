class Router {
    constructor(routes) {
      this.routes = routes;
      this._loadInitialRoute();
      this._handleLinkClicks();
    }
  
    loadRoute(...urlSegments) {
      const matchedRoute = this._matchUrlToRoute(urlSegments);
  
      const url = `/${urlSegments.join('/')}`;
      history.pushState({}, 'this works', url);
  
      const routerOutletElement = document.querySelector('#app');
      routerOutletElement.innerHTML = matchedRoute.template;
      matchedRoute.controller();
    }
  
    _matchUrlToRoute(urlSegments) {
      const matchedRoute = this.routes.find(route => {
        const routePathSegments = route.path.split('/').slice(1);
  
        if (routePathSegments.length !== urlSegments.length) {
          return false;
        }
  
        return routePathSegments
          .every((routePathSegment, i) => routePathSegment === urlSegments[i]);
      });
  
      return matchedRoute;
    }
  
    _loadInitialRoute() {
      const pathnameSplit = window.location.pathname.split('/');
      const pathSegments = pathnameSplit.length > 1 ? pathnameSplit.slice(1) : '';
      this.loadRoute(...pathSegments);
    }
  
    _handleLinkClicks() {
      document.addEventListener('click', (event) => {
        if (event.target.matches('[data-link]')) {
          event.preventDefault();
          const url = event.target.href;
          const urlSegments = url.split('/').slice(3);
          this.loadRoute(...urlSegments);
        }
      });
    }
  }
  
  // Exportar la clase Router en un entorno sin módulos.
  window.Router = Router;
  