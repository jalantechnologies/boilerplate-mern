export default class ConfigManager {
  // This method is called at the application start to allow config
  // module to initialize its resources.
  public static async mountConfig(): Promise<void> {
    return Promise.resolve();
  }
}
