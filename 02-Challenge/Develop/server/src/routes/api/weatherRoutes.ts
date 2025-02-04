import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  try {
    console.log(req.body);
    const { cityName } = req.body;

    if (!cityName) {
      return res.status(400).json({ message: 'City is required' });
    }

    const weatherData = await WeatherService.getWeatherForCity(cityName);

    // TODO: save city to search history
    await HistoryService.addCity(cityName);

    return res.status(200).json(weatherData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Sorry! Failed to fetch weather!' });
  }
  
});

// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    const history = await HistoryService.getCities();
    res.status(200).json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Sorry! Failed to fetch history!' });
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await HistoryService.removeCity(id);
    if (!deleted) {
      return res.status(404).json({ message: 'City not found' });
    }

    return res.status(200).json({ message: 'City deleted from history' });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Sorry! Failed to delete city!' });
  }
});

export default router;
