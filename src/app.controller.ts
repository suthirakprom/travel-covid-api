import { Controller, Get } from '@nestjs/common';
import { ApiHeader, ApiSecurity } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiSecurity('api_key', ['api_key'])
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/test')
  getHello(): string {
    return this.appService.getHello();
  }
}
