import { mock, instance, when } from "ts-mockito"
import { Redisk } from "redisk"
import { GetOrdersQuery } from "../impl"
import { Order } from "src/orders/entities/order.entity"
import { GetOrdersHandler } from "./get-orders.handler"
import { OrderState } from "src/enums/order-state.enum"

describe("GetOrdersHandler", () => {
  it("should query redis", async () => {
    const redisk = mock(Redisk)

    const orders = [
      new Order(
        "::id::",
        "::name::",
        "::email::",
        OrderState.CREATED,
        new Date()
      ),
    ]
    when(redisk.list(Order)).thenResolve(orders)

    const response = await new GetOrdersHandler(instance(redisk)).execute(
      new GetOrdersQuery()
    )

    expect(response).toEqual(orders)
  })
})
