import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { AirTicketController } from './air-ticket.controller';
import { AirTicketService } from './air-ticket.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    AuthModule,
  ],
  controllers: [AirTicketController],
  providers: [AirTicketService],
})
export class AirTicketModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('');
  }
}
