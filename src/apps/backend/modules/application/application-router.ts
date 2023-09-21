import { Router } from 'express';

export default abstract class ApplicationRouter {
  readonly router: Router;

  constructor() {
    this.router = Router({ mergeParams: true });
    this.configure();
  }

  protected abstract configure(): void;
}
