export {};

declare global {
  interface Window {
    __insp: Array<Array<string | number>>,
    __inspld: number,
    inspectlet_key: string,
  }
}
