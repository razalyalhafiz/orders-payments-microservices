import { mock, instance, verify, deepEqual } from "ts-mockito"
import { Redisk } from "redisk"
import { OrderCreatedUpdater } from "./order-created.updater"
import { OrderCreatedEvent } from "../impl/order-created.event"
import { Order } from "src/orders/entities/order.entity"
import { OrderState } from "src/enums/order-state.enum"

describe("OrderCreatedUpdater", () => {
  it("should update redis", async () => {
    const redisk = mock(Redisk)

    const id = "59E9C6528026"
    const name = "Foo"
    const email = "foo@bar.com"
    const state = OrderState.CREATED
    const date = new Date()

    await new OrderCreatedUpdater(instance(redisk)).handle(
      new OrderCreatedEvent(id, name, email, state, date)
    )

    verify(
      redisk.save(deepEqual(new Order(id, name, email, state, date)))
    ).once()
  })
})
