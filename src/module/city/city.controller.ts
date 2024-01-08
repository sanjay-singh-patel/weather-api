// city/city.controller.ts
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CityService } from './city.service';
import { BasicStrategy } from '../../auth/basic.stratergy';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  @UseGuards(BasicStrategy)
  async create(@Body() createCityDto: { name: string }) {
    this.cityService.create(createCityDto);
  }

  @Get()
  async findAll() {
    return this.cityService.findAll();
  }
}