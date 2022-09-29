import { Client, Server } from 'styletron-engine-atomic';

export const isServer = typeof window === 'undefined';

const getHydrateClass = () => document.getElementsByClassName(
  '_styletron_hydrate_',
) as HTMLCollectionOf<HTMLStyleElement>;
export const styletron = isServer
  ? new Server()
  : new Client({
    hydrate: getHydrateClass(),
  });
