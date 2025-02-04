// TODO: Define a City class with name and id properties
class City {
  name: string;
  id: string;
  constructor(
    name: string, 
    id: string
  ) {
    this.name = name;
    this.id = id;
  }
}

import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

// TODO: Complete the HistoryService class
class HistoryService {
  private filePath: string;

  constructor() {
    this.filePath = './db/db.json';
  }
// TODO: Define a read method that reads from the searchHistory.json file
private async read(): Promise<City[]> {
  try {
    const data = await fs.readFile(this.filePath, { encoding: 'utf8' });
    return JSON.parse(data) as City[];
  } catch (error) {
    console.error(error);
    return [];
  }
}

  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]): Promise<void> {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(cities, null, 2));
    } catch (error) {
      console.error(error);
      throw new Error('Failed to write search history');
    }
  }

  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities(): Promise<City[]> {
    const cities = await this.read();
    return cities;
  }

  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string): Promise<City> {
    const cities = await this.read();
    const newCity = new City(city, uuidv4());

    cities.push(newCity);
    await this.write(cities);

    return newCity;
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string): Promise<boolean> {
    const cities = await this.read();
    const updatedCities = cities.filter((city) => city.id !== id);
    
    if (cities.length === updatedCities.length) {
      return false;
    }

    await this.write(updatedCities);

    return true;
  }
}

export default new HistoryService();
