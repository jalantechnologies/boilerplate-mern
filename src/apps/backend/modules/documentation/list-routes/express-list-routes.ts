import { Application } from 'express';
import { HttpRoute, Stack } from 'modules/documentation/list-routes';

const getPathFromRegex = (regexp: RegExp): string =>
  regexp
    .toString()
    .replace('/^', '')
    .replace('?(?=\\/|$)/i', '')
    .replace(/\\\//g, '/')
    .replace('(?:/(?=$))', '');

const combineExpress4Stacks = (acc: Stack[], stack: Stack): Stack[] => {
  if (stack.handle?.stack && stack.regexp) {
    const routerPath = getPathFromRegex(stack.regexp);
    return [
      ...acc,
      ...stack.handle.stack.map((nestedStack) => ({
        routerPath,
        ...nestedStack,
      })),
    ];
  }
  return [...acc, stack];
};

const getStacks = (app: Application): Stack[] => {
  if (app._router && app._router.stack) {
    /* eslint-disable @typescript-eslint/no-unsafe-call */
    return app._router.stack.reduce(combineExpress4Stacks, []) as Stack[];
  }

  return [];
};

const expressListRoutes = (
  app: Application,
  baseAPIRoutePath: string
): HttpRoute[] => {
  const stacks = getStacks(app);
  if (!stacks) {
    return [];
  }

  const paths: HttpRoute[] = [];

  stacks.forEach((stack) => {
    if (stack.route) {
      stack.route.stack.forEach((route) => {
        const method = route.method ? route.method.toUpperCase() : null;
        if (method) {
          paths.push({
            baseAPIRoutePath,
            method,
            rootRouterPath: stack.routerPath,
            routerPath: stack.route.path,
          });
        }
      });
    }
  });

  return paths;
};

export default expressListRoutes;
