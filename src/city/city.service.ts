import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { City } from './schema/city.schema';

@Injectable()
export class CityService {
  constructor(@InjectModel('City') private readonly cityModel: mongoose.Model<City>) {}

  // Get all cities from mongodb
  async getAllCities() {
    return await this.cityModel.find();
  }
  async createCity(city: City): Promise<City> {
    return this.cityModel.create(city);
  }
}