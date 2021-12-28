import { Module } from '@nestjs/common';
import { EntryRestrictionService } from './entry-restriction.service';
import { EntryRestrictionController } from './entry-restriction.controller';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Country, CountrySchema } from './schemas/country.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Country.name, schema: CountrySchema }]),
  ],
  controllers: [EntryRestrictionController],
  providers: [EntryRestrictionService],
})
export class EntryRestrictionModule {}
