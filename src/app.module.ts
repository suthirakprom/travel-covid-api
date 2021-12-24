import { Module, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { ConfigModule } from '@nestjs/config';
import { CovidController } from './covid_info/covid.controller';
import { CovidModule } from './covid_info/covid.module';
import { CovidService } from './covid_info/covid.service';
import { AirTicketModule } from './air-ticket/air-ticket.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.DATABASE_URL,
    ),
    AuthModule,
    CovidModule,
    AirTicketModule,
  ],
  controllers: [AppController,CovidController],
  providers: [AppService,CovidService]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('');
  }
}
