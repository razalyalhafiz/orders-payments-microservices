import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'src/config';
import { PaymentSchema } from './schemas/payment.schema';

@Module({
  imports: [
    MongooseModule.forRoot(config.MONGO_URL),
    MongooseModule.forFeature([{ name: 'Payment', schema: PaymentSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
