import { Injectable, Logger } from "@nestjs/common"
import { SSEService } from "../sse/sse.service"
import { Observable, Subscription } from "rxjs"
import { config } from "src/config"
import { CommandBus } from "@nestjs/cqrs"
import { DeliverOrderCommand } from "./commands/impl/deliver-order.command"
import { StorableEvent } from "event-sourcing-nestjs"
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from "@nestjs/microservices"

interface DeliveryQueueItem {
  orderId: string
  subscription: Subscription
}

@Injectable()
export class OrdersService {
  private _deliveryQueue: DeliveryQueueItem[] = []
  private readonly _logger = new Logger(OrdersService.name)
  private _client: ClientProxy

  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _sseService: SSEService
  ) {
    this._client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        url: config.REDIS_URL,
      },
    })
  }

  addToDeliveryQueue(orderId: string) {
    const timer$ = new Observable((observer) => {
      const id = setTimeout(() => observer.next(), parseInt(config.DELIVERY_TIMEOUT))
      return () => clearTimeout(id)
    })

    const sub = timer$.subscribe(() =>
      this._commandBus.execute(new DeliverOrderCommand(orderId))
    )

    this._deliveryQueue.push({ orderId, subscription: sub })
    this._logger.verbose(`${orderId} added to delivery queue!`)
  }

  removeFromDeliveryQueue(orderId: string) {
    const cancelledOrder = this._deliveryQueue.find(
      (item) => item.orderId === orderId
    )

    if (!cancelledOrder) return
    cancelledOrder.subscription.unsubscribe()

    this._deliveryQueue = this._deliveryQueue.filter(
      (item) => item.orderId !== orderId
    )
    this._logger.verbose(`${orderId} unsubscribed!`)
  }

  sendEventToClient(event: StorableEvent) {
    this._sseService.write(event)
  }

  processPayment(orderId: string) {
    this._client.emit<any>("order_created", { orderId })
  }
}
