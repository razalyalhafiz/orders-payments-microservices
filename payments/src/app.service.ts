import { Injectable, Logger } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Payment } from './schemas/payment.schema';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { PaymentState } from './enums/payment-state.enum';
import { Observable, from } from 'rxjs';
import { delay } from 'rxjs/operators';
import { config } from 'src/config';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  private client: ClientProxy;

  constructor(
    @InjectModel('Payment') private readonly paymentModel: Model<Payment>,
  ) {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        url: config.REDIS_URL
      },
    });
  }

  handlePayment(createPaymentDto: CreatePaymentDto) {
    this.logger.verbose(
      `Payment processing... ${JSON.stringify(createPaymentDto)}`,
    );
    this.processPayment(createPaymentDto).subscribe(payment => {
      switch (payment.state) {
        case PaymentState.CONFIRMED:
          this.client.emit<any>('payment_confirmed', payment);
          break;

        case PaymentState.DECLINED:
          this.client.emit<any>('payment_declined', payment);
          break;

        default:
          break;
      }
    });
  }

  processPayment(createPaymentDto: CreatePaymentDto): Observable<Payment> {
    const paymentState = this.randomEnum(PaymentState);
    const { orderId } = createPaymentDto;
    const payment = new this.paymentModel({ orderId, state: paymentState });
    return from(payment.save()).pipe(delay(parseInt(config.PROCESS_PAYMENT_TIMEOUT)));
  }

  randomEnum<T>(anEnum: T): T[keyof T] {
    const enumValues = (Object.values(anEnum) as unknown) as T[keyof T][];
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    return enumValues[randomIndex];
  }
}
