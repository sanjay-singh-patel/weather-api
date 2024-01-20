import { Test, TestingModule } from '@nestjs/testing';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AddCityDto } from './dto/add.city.dto';
import { getModelToken } from '@nestjs/mongoose';
import { City } from './schema/city.schema';
import { HttpModule, HttpService } from '@nestjs/axios';

describe('CityController', () => {
  let app: INestApplication;
  let cityService: CityService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
        imports: [HttpModule],
      controllers: [CityController],
      providers: [
        CityService,
        {
          provide: getModelToken('City'),
          useValue: {
            find: jest.fn().mockResolvedValue([new City()]),
            create: jest.fn().mockResolvedValue(new City()),
          },
        },
      ],
    }).compile();
  
    app = moduleRef.createNestApplication();
    cityService = moduleRef.get<CityService>(CityService);
    await app.init();
  });

  it('should Add a city to mongo database', async () => {
    const city: AddCityDto = { name: 'Test City' };
    jest.spyOn(cityService, 'createCity').mockImplementation(async () => city as any);

    await request(app.getHttpServer())
      .post('/add')
      .send(city)
      .expect(200);
  });

  it('should get all cities', async () => {
    const result = [{ name: 'Test City'}];

    jest.spyOn(cityService, 'getAllCities').mockImplementation(async () => result as any);

    await request(app.getHttpServer())
      .get('/cities')
      .expect(200)
      .expect(result);
  });

  it('should get weather data', async () => {
    const result = [{ name: 'Test City'}];
    jest.spyOn(cityService, 'getWeather').mockImplementation(async () => result as any);

    await request(app.getHttpServer())
        .get('/weather')
        .expect(200)
        .expect(result);
    }
    );


  afterAll(async () => {
    await app.close();
  });
});
