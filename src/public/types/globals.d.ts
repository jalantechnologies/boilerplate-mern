export {};

declare global {
  interface Window {
    __insp: Array<Array<string | number>>,
    __inspld: number,
    inspectletKey: string,
  }
  const CONFIG: { [key: string]: { [key: string]: string } };
}
