import { writeFileSync } from 'fs';

export function listRoutes(controller: any) {
  const routes = Reflect.getMetadata('routes', controller) || [];
  const output = routes.map(route => 
    `${route.method} ${route.path} -> ${route.handler}\n${route.code}\n`
  ).join('\n');
  
  writeFileSync('sample-output.txt', output);
}
