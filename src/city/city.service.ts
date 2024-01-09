import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { City } from './schema/city.schema';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CityService {
  constructor(@InjectModel('City') private readonly cityModel: mongoose.Model<City>,private readonly httpService: HttpService) {}

  // Get all cities from mongodb
  async getAllCities() {
    return await this.cityModel.find();
  }
  async createCity(city: City): Promise<City> {
    return this.cityModel.create(city);
  }
  async getWeather() {
    const cities = await this.getAllCities(); // use CityService to get cities
    const weatherDataPromises = cities.map(city =>
      this.httpService
        .get(`http://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${process.env.OPENWEATHER_API_KEY}`) // assuming city is an object with a name property
        .pipe(map(response => response.data))
        .toPromise(),
    );

    const weatherData = await Promise.all(weatherDataPromises);

    return weatherData;
  }
}