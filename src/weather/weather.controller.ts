import { Controller, Get } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
    constructor(private readonly weatherServie: WeatherService) {}
    @Get()
    getWeather(): string {
        return this.weatherServie.getWeather();
    }
}
