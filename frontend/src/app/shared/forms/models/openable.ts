export abstract class Openable {
  open: boolean = false;
  abstract close(): void;
}
