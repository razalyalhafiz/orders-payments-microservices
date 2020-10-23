export class CancelOrderCommand {
  constructor(public readonly id: string, public readonly reason: string) {}
}
