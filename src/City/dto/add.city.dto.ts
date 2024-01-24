import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AddCityDto {
    @ApiProperty({ description: 'The name of the city.' })
    @IsNotEmpty({message:'A city must have a name.'})
    name: string;
    }