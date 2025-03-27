export type HttpRoute = {
  baseAPIRoutePath: string;
  method: string;
  rootRouterPath: string;
  routerPath: string;
};

export interface NestedStack {
  method?: string;
  path: string;
  route: {
    path: string;
    stack: NestedStack[];
  };
}

export interface Stack {
  handle?: {
    stack: NestedStack[];
  };
  regexp?: RegExp;
  route?: {
    path: string;
    stack: NestedStack[];
  };
  routerPath: string;
}
