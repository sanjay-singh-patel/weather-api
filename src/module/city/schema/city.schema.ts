import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type CityDocument = HydratedDocument<City>;

@Schema()
export class City {
  @Prop()
  name: string;
}

export const CitySchema = SchemaFactory.createForClass(City);
