// This file is responsible for defining a simple custom router.
// It allows you to call functions when a url is matched.
// Your blog isn't an SPA so this works just fine.
export default class Router {
  private routesToMatch: Map<string, RouteHandler> = new Map();

  register(path: string, handler: RouteHandler) {
    console.debug('registering path', path);

    this.routesToMatch.set(path, handler);
  }

  route(path: string): any {
    console.debug('routing path', path);

    for (const pathToMatch of this.routesToMatch.keys()) {
      if (path.includes(pathToMatch)) { // Doesn't need to be exact.
        console.debug('found route', path);

        return this.routesToMatch.get(pathToMatch)!();
      }
    }

    //throw new Error(`No route found for: ${path}`);
    console.warn(`No route found for: ${path}`);
  }
}

type RouteHandler = () => any;
