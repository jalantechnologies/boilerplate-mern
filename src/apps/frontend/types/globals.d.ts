export {};

declare global {
  const Config: {
    env: string;
    inspectLetKey: string;
  };

  interface Window {
    __insp: Array<Array<string | number>>;
    __inspld: number;
    Config: {
      env: string;
      inspectLetKey: string;
    };
  }
}
