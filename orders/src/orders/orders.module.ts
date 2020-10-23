import { Module, MiddlewareConsumer } from "@nestjs/common"
import { CqrsModule } from "@nestjs/cqrs"
import { CommandHandlers } from "./commands/handlers"
import { EventHandlers } from "./events/handlers"
import { QueryHandlers } from "./queries/handlers"
import { OrdersController } from "./orders.controller"
import { StateUpdaters } from "./events/updaters"
import { EventSourcingModule } from "event-sourcing-nestjs"
import { CommonModule } from "src/common/common.module"
import { OrdersService } from "./orders.service"
import { SSEMiddleware } from "nestjs-sse"
import { SSEController } from "../sse/sse.controller"
import { SSEService } from "src/sse/sse.service"

@Module({
  imports: [CqrsModule, CommonModule, EventSourcingModule.forFeature()],
  controllers: [OrdersController, SSEController],
  providers: [
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    ...StateUpdaters,
    OrdersService,
    SSEService,
  ],
})
export class OrdersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SSEMiddleware).forRoutes(SSEController)
  }
}
