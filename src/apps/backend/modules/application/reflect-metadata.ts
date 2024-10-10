// src/apps/backend/modules/application/controller-decorators.ts
import 'reflect-metadata';

export function Route(method: string, path: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const routes = Reflect.getMetadata('routes', target.constructor) || [];
    const handlerCode = descriptor.value.toString(); // Get the complete method code
    routes.push({ method, path, handler: propertyKey, code: handlerCode });
    Reflect.defineMetadata('routes', routes, target.constructor);
  };
}