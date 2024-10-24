import { Application } from 'express';

import { HttpRoute, Stack } from './types';

function getPathFromRegex(regexp: RegExp): string {
  return regexp
    .toString()
    .replace('/^', '')
    .replace('?(?=\\/|$)/i', '')
    .replace(/\\\//g, '/')
    .replace('(?:/(?=$))', '');
}

function combineExpress4Stacks(acc: Stack[], stack: Stack): Stack[] {
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
}

function getStacks(app: Application): Stack[] {
  if (app._router && app._router.stack) {
    /* eslint-disable @typescript-eslint/no-unsafe-call */
    return app._router.stack.reduce(combineExpress4Stacks, []) as Stack[];
  }

  return [];
}

const expressListRoutes = (app: Application): HttpRoute[] => {
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
            method,
            routerPath: stack.routerPath,
            path: stack.route.path,
          });
        }
      });
    }
  });

  return paths;
};

export default expressListRoutes;
