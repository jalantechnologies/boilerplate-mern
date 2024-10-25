import { Router } from 'express';

export default abstract class ApplicationRouter {
  readonly router: Router;

  routerFilePath: string;

  constructor(routerFilePath: string) {
    this.routerFilePath = routerFilePath;

    this.router = Router({ mergeParams: true });
    this.configure();
  }

  protected abstract configure(): void;
}
