import { Controller, Get, Param } from '@nestjs/common';
import { EntryRestrictionService } from './entry-restriction.service';
import { ApiHeader, ApiSecurity } from '@nestjs/swagger';

@ApiSecurity('api_key', ['api_key'])
@Controller('entry-restriction')
export class EntryRestrictionController {
  constructor(private readonly entryRestrictionService: EntryRestrictionService) {}

  @Get('/entry-restriction/:country')
  async getEntryRestriction(@Param('country') country: string) {
    return await this.entryRestrictionService.getEntry(country);
  }
}
