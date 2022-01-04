import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Mixed } from 'mongoose';

export type CountryDocument = Country & Document;

@Schema()
export class Country {
  @Prop()
  country: string;

  @Prop()
  iso: string;

  @Prop()
  status: string;

  @Prop()
  vaccinated: boolean;

  @Prop({ type: Object })
  destinations: Array<any>;

  @Prop({ type: Date, default: Date.now })
  date: Date
}

export const CountrySchema = SchemaFactory.createForClass(Country);