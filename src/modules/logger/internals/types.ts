export default interface Logger {
  info(message: string): void;
  debug(message: string): void;
  warn(message: string): void;
  criticial(message: string): void;
}
