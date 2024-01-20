import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CityService } from './city.service';
import { City } from './schema/city.schema';
import { AddCityDto } from './dto/add.city.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBasicAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('')
@Controller('')
export class CityController {
    constructor(private readonly cityService:CityService) {}
    @ApiBasicAuth()
    @UseGuards(AuthGuard('basic'))
    @Post('add') 
    @ApiOperation({ summary: 'Create city after authentication' })
  @ApiResponse({ status: 201, description: 'The city has been successfully created.'})
  @ApiBody({ type: AddCityDto })
  
    async createCity(@Body() city: AddCityDto): Promise<City> {
    return this.cityService.createCity(city);
  }
    @Get('cities')
    async getAllCities(): Promise<City []> {
        return this.cityService.getAllCities();
    }

    @Get('weather')
    async getWeather(): Promise<any> {
        return this.cityService.getWeather();
    }
}

