import { ApiProperty } from "@nestjs/swagger";

export class AddCityDto {
    @ApiProperty({ description: 'The name of the city.' })

    name: string;
    }