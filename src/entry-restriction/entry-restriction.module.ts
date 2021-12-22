import { Module } from '@nestjs/common';
import { EntryRestrictionService } from './entry-restriction.service';
import { EntryRestrictionController } from './entry-restriction.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [EntryRestrictionController],
  providers: [EntryRestrictionService]
})
export class EntryRestrictionModule {}
