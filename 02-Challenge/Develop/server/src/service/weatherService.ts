import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// TODO: Define a class for the Weather object
class Weather {
  city: string;
  date: string;
  icon: string;
  iconDescription: string;
  tempF: number;
  humidity: number;
  windSpeed: number;
  forecast: Array<{
    date: string, 
    iconDescription: string, 
    tempF: number, 
    humidity: number, 
    windSpeed: number
  }>;

  constructor(
    city: string,
    date: string,
    icon: string,
    iconDescription: string, 
    tempF: number, 
    humidity: number, 
    windSpeed: number, 
    forecast: Array<{
      date: string, 
      iconDescription: string, 
      tempF: number, 
      humidity: number, 
      windSpeed: number}>
    ) {
    this.city = city;
    this.date = date;
    this.icon = icon;
    this.iconDescription = iconDescription;
    this.tempF = tempF;
    this.humidity = humidity;
    this.windSpeed = windSpeed;
    this.forecast = forecast;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL: string;
  private apiKey: string;
  private cityName: string;

  constructor() {
    this.baseURL = 'https://api.openweathermap.org/data/2.5/';
    this.apiKey = process.env.API_KEY || '';
    this.cityName = '';
  }

  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string): Promise<any> {
    const geocodeURL = `http://api.openweathermap.org/geo/1.0/direct`;
    const response = await fetch(`${geocodeURL}?q=${query}&limit=1&appid=${this.apiKey}`);
    const data = await response.json();

    if (!data.length) {
      throw new Error('City not found');
    }
    return data[0];
  }

  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: any): Coordinates {
    return { lat: locationData.lat, lon: locationData.lon };
  }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(query: string): string {
    return `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${this.apiKey}`;
  }

  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=imperial`;
  }

  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(query: string): Promise<any> {
    const locationData = await this.fetchLocationData(query);
    return this.destructureLocationData(locationData);
  }

  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const weatherURL = this.buildWeatherQuery(coordinates);
    const response = await fetch(weatherURL);
    const data = await response.json();
    return data;
  }

  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any): any[] {
    const day = response.list[0];
    const currentWeather = {
      date: day.dt_txt,
      iconDescription: day.weather[0].description,
      tempF: day.main.temp,
      humidity: day.main.humidity,
      windSpeed: day.wind.speed,
      icon: day.weather[0].icon
    };

    const forecast = response.list.filter((day: any) => day.dt_txt.includes('12:00:00')).map((day: any) => ({
      date: day.dt_txt,
      iconDescription: day.weather[0].iconDescription,
      tempF: day.main.temp,
      humidity: day.main.humidity,
      windSpeed: day.wind.speed,
      icon: day.weather[0].icon
    }));

    return [currentWeather, ...forecast];
  }

  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]): Array<{
    date: string, 
    iconDescription: string, 
    tempF: number, 
    humidity: number, 
    windSpeed: number
  }> {
    return weatherData.slice(1, 6).map((day: any) => ({
      date: day.dt_txt,
      iconDescription: day.weather[0].iconDescription,
      tempF: day.main.temp,
      humidity: day.main.humidity,
      windSpeed: day.wind.speed
    }));
  }

  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string): Promise<Weather[]> {
    try {
      this.cityName = city;

      const locationData = await this.fetchLocationData(city);
      const coordinates = this.destructureLocationData(locationData);
      const weatherResponse = await this.fetchWeatherData(coordinates);

      const forecast = this.parseCurrentWeather(weatherResponse);
      forecast[0].city = city;
      return forecast;

    } catch (error) {
      console.error(error);
      throw new Error(`Failed to fetch weather for ${city}`);
    }
  }
}

export default new WeatherService();
