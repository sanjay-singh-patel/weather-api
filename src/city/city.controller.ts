import { Body, Controller, Get, Post } from '@nestjs/common';
import { CityService } from './city.service';
import { City } from './schema/city.schema';
import { AddCityDto } from './dto/add.city.dto';

@Controller('')
export class CityController {
    constructor(private readonly cityService:CityService) {}
    @Get('cities')
    async getAllCities(): Promise<City []> {
        return this.cityService.getAllCities();
    }
    @Post('add')
    async createCity(@Body() city: AddCityDto): Promise<City> {
        return this.cityService.createCity(city);
    }
}

