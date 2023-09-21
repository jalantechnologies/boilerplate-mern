import { Request as ExpressReq, Response as ExpressRes } from 'express';
import _ from 'lodash';

export const applicationController = (
  ctrl: (...args: unknown[]) => Promise<unknown> | unknown,
) => (...args: unknown[]): void => {
  // invoke provided middleware
  const fnReturn = ctrl(...args);

  // this will search for a FUNCTION from last item in args
  // this was done in order to support param based controllers (req, res, next, id)
  // going by the default approach of resolving next as last arg won't work here
  const nextArg = _.findLastIndex(args, (arg) => typeof arg === 'function');
  const next: NextFunc = args[nextArg] as NextFunc;

  // resolve any possible promise returned by the middleware, handle errors via passing it to next
  Promise.resolve(fnReturn).catch(next);
};

export interface Request<T = unknown> extends ExpressReq {
  body: T;
  accountId?: string;
}

export interface Response<T = unknown> extends ExpressRes {
  send: (body?: T) => this;
}

export type NextFunc = (err?: Error) => void;
