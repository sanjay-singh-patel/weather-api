import { Schema,Prop,SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema({timestamps: true})
export class City {
    @Prop()
    @ApiProperty()
    name: string;
}   

export const CitySchema = SchemaFactory.createForClass(City);