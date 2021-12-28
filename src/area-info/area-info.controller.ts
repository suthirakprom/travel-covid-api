import { Controller, Get, Param } from '@nestjs/common';
import { AreaInfoService } from './area-info.service';
import { ApiSecurity } from '@nestjs/swagger';

@ApiSecurity('api_key', ['api_key'])
@Controller('area-info')
export class AreaInfoController {
  constructor(private readonly areaInfoService: AreaInfoService) {}

  @Get('/:countryCode')
  async getAreaInfo(@Param('countryCode') countryCode: string) {
    return await this.areaInfoService.areaRegulation(countryCode);
  }
}
