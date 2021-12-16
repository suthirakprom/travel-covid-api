import { Module, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CovidController } from './covid.controller';
import { CovidService } from './covid.service';
import { AuthModule } from '../auth/auth.module';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.DATABASE_URL,
    ),
    AuthModule,
  ],
  controllers: [CovidController],
  providers: [CovidService]
})
export class CovidModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('');
  }
}
