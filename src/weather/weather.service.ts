import { Injectable } from '@nestjs/common';

@Injectable()
export class WeatherService {
    getWeather(): string {
        return 'Weather';
    }
}
