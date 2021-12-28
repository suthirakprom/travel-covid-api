import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Mixed } from 'mongoose';

export type CountryDocument = Country & Document;

@Schema()
export class Country {
  @Prop()
  destination_name: string;

  @Prop()
  destination_iso: string;

  @Prop({ type: Object })
  travel_status: Object;

  @Prop({ type: Object })
  destinations: Array<any>;

  @Prop({ type: Date, default: Date.now })
  date: Date
}

export const CountrySchema = SchemaFactory.createForClass(Country);