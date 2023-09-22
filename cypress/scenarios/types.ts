export interface ScenarioSetupFunc {
  <T = unknown>(params?: unknown): Promise<T>;
}

export interface ScenarioCleanupFunc {
  (): Promise<void>;
}

export interface Scenario {
  setup: ScenarioSetupFunc;
  cleanup: ScenarioCleanupFunc;
}

export interface Scenarios {
  [key: string]: Scenario;
}
