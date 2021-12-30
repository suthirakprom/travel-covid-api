import { Controller, Get, Param, Query } from '@nestjs/common';
import { EntryRestrictionService } from './entry-restriction.service';
import { ApiHeader, ApiSecurity } from '@nestjs/swagger';
import { query } from 'express';

@ApiSecurity('api_key', ['api_key'])
@Controller('entry-restriction')
export class EntryRestrictionController {
  constructor(
    private readonly entryRestrictionService: EntryRestrictionService,
  ) {}

  @Get('/:country')
  async getEntryRestrictionByCountry(
    @Param('country') country: string,
    @Query('from') source: string,
    @Query('vaccinated') vaccinated: boolean,
  ) {
    return await this.entryRestrictionService.getEntryRestrictionByCountry(
      country,
      source,
      vaccinated,
    );
  }

  @Get('/')
  async getEntryRestriction() {
    return await this.entryRestrictionService.getEntryRestriction();
  }
}
