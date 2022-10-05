export {};

declare global {
  interface Window {
    __insp: Array<Array<string | number>>,
    __inspld: number,
  }

  const CONFIG: {
    env: string,
    inspectletKey: string,
  };
}
