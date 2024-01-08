import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { CityService } from '../city/city.service';

@Module({
  imports: [HttpModule],
  providers: [WeatherService, CityService],
  exports: [WeatherService],
})
export class WeatherModule {}