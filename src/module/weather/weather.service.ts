import { Injectable } from '@nestjs/common';
import { CityService } from '../city/city.service';
import { HttpService } from '@nestjs/axios';
@Injectable()
export class WeatherService {
  constructor(
    private httpService: HttpService,
    private cityService: CityService,
  ) {}

  async getWeatherForAllCities() {
    const cities = await this.cityService.findAll();
    return Promise.all(
      cities.map(city =>
        this.httpService
          .get(`http://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid={process.env.OPEN_WEATHER_API_KEY}`),
      ),
    );
  }
}