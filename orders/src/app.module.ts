import { Module, DynamicModule } from "@nestjs/common"
import { OrdersModule } from "./orders/orders.module"
import { EventSourcingModule } from "event-sourcing-nestjs"
import { RediskModule } from "redisk-nestjs"
import { config } from "src/config"

@Module({})
export class AppModule {
  static forRoot(): DynamicModule {
    return {
      module: this,
      imports: [
        OrdersModule,
        RediskModule.forRoot({ url: config.REDIS_URL }),
        EventSourcingModule.forRoot({ mongoURL: config.MONGO_URL }),
      ]
    }
  }
}
