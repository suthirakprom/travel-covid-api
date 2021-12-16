import { Controller, Get, Param } from '@nestjs/common';
import { ApiHeader, ApiSecurity } from '@nestjs/swagger';
import { CovidService } from './covid.service';

@ApiSecurity('api_key', ['api_key'])
@Controller()
export class CovidController {
  constructor(private readonly covidService: CovidService) {}

  @Get('/covidAll')
  async getCovidAll(): Promise<Array<any>> {
    return await this.covidService.getCovidAll();
  }
}
