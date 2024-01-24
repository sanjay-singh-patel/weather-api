import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { City } from './schema/city.schema';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CityService {
  constructor(@InjectModel('City') private readonly cityModel: mongoose.Model<City>,private readonly httpService: HttpService) {}

  async getAllCities() {
    return await this.cityModel.find();
  }
  async createCity(city: City): Promise<City> {
    return this.cityModel.create(city);
  }
  async getWeather() {
    let cities = await this.cityModel.find(); 
    if (!cities) {
      throw new Error('Failed to fetch cities');
    }
      const weatherDataPromises = cities.map(async city =>{
      const data = await this.httpService
        .get(`http://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${process.env.OPENWEATHER_API_KEY}`) 
        .toPromise();
      return {
        City: data.data.name,
        Country: data.data.sys.country,
        Temperature: data.data.main.temp,
        Weather: data.data.weather[0].main,
        Sky:data.data.weather[0].description,

      };
  });
    const weatherData = await Promise.all(weatherDataPromises);

    return weatherData;
  }
}