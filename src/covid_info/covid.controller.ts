import { Controller, Get, Param ,Query} from '@nestjs/common';
import { ApiHeader, ApiSecurity } from '@nestjs/swagger';

import { CovidService } from './covid.service';

@ApiSecurity('api_key', ['api_key'])
@Controller()
export class CovidController {
  constructor(private readonly covidService: CovidService) {}

  @Get('covid-info')
  async getCovidAll(): Promise<any | undefined> {
    return await this.covidService.getCovidAll();
  }

  @Get('/covid-info/:country_code')
  async getCompanyById(@Param('country_code') country_code: string): Promise<any> {
    return await this.covidService.getCovidByCountry(country_code);
  }

  @Get('/covid-info/history/:country_code')
  async getCovidHistoty(
    @Param('country_code') country: string,
    @Query('lastdays') lastday: string,
    ): Promise<any> {
    return await this.covidService.getCovidHistory(country,lastday);
  }


}
