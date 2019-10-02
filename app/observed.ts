export abstract class Observed {
  abstract init(): void;
  abstract listenForUnload(): void;
}
