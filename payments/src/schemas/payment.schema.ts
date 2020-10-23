import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { PaymentState } from 'src/enums/payment-state.enum';

@Schema()
export class Payment extends Document {
  @Prop({ default: uuid })
  paymentId: string;

  @Prop({ required: true })
  orderId: string;

  @Prop({ required: true, enum: Object.values(PaymentState) })
  state: string;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
