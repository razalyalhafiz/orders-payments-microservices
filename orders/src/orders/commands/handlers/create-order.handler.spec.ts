import { mock, instance, when, verify, deepEqual } from "ts-mockito"
import { CreateOrderHandler } from "./create-order.handler"
import { StoreEventBus } from "event-sourcing-nestjs"
import { CreateOrderCommand } from "../impl/create-order.command"
import { OrderCreatedEvent } from "src/orders/events/impl/order-created.event"
import { DateFactory } from "src/common/date.factory"
import { UidGenerator } from "src/common/uid-generator"
import { OrderState } from "src/enums/order-state.enum"

describe("CreateOrderHandler", () => {
  it("should emit OrderCreatedEvent", async () => {
    const uidGenerator = mock(UidGenerator)
    const eventBus = mock(StoreEventBus)
    const dateFactory = mock(DateFactory)

    const name = "Foo"
    const email = "foo@bar.com"
    const state = OrderState.CREATED
    const uid = "043B5FAC980F"
    const date = new Date()

    when(uidGenerator.generate()).thenReturn(uid)
    when(dateFactory.now()).thenReturn(date)

    const createOrderHandler = new CreateOrderHandler(
      instance(eventBus),
      instance(uidGenerator),
      instance(dateFactory)
    )

    const response = await createOrderHandler.execute(
      new CreateOrderCommand(name, email)
    )

    // expect(response).toEqual(uid)
    expect(response).toEqual(
      new OrderCreatedEvent(uid, name, email, state, date)
    )
    verify(
      eventBus.publish(
        deepEqual(new OrderCreatedEvent(uid, name, email, state, date))
      )
    ).once()
  })
})
