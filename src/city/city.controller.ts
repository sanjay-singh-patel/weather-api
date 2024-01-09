import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CityService } from './city.service';
import { City } from './schema/city.schema';
import { AddCityDto } from './dto/add.city.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('')
export class CityController {
    constructor(private readonly cityService:CityService) {}
    @UseGuards(AuthGuard('basic'))
    @Post('add')
    async createCity(@Body() city: AddCityDto): Promise<City> {
    return this.cityService.createCity(city);
  }
    @Get('cities')
    async getAllCities(): Promise<City []> {
        return this.cityService.getAllCities();
    }

    @Get()
    async getWeather(): Promise<any> {
        return this.cityService.getWeather();
    }
}

