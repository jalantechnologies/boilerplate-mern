export {};

declare global {
  interface Window {
    Config: {
      env: string;
      inspectLetKey: string;
    };
  }
}
