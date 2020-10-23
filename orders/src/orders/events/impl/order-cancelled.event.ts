import { StorableEvent } from "event-sourcing-nestjs"

export class OrderCancelledEvent extends StorableEvent {
  eventAggregate = "order"
  eventVersion = 1

  constructor(
    public readonly id: string,
    public readonly reason: string,
    public readonly timestamp: Date
  ) {
    super()
  }
}
