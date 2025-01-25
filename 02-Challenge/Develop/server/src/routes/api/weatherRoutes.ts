import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  try {
    const { city } = req.body;

    if (!city) {
      return res.status(400).json({ message: 'City is required' });
    }
    // TODO: save city to search history
    await HistoryService.save(city);

    res.status (200).json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Sorry! Failed to fetch weather!' });

  
});

// TODO: GET search history
router.get('/history', async (req: Request, res: Response) => {
  try {
    const history = await HistoryService.get();
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
    await HistoryService.delete(id);
    res.status(200).json({ message: 'City deleted from history' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Sorry! Failed to delete city!' });
  }
});

export default router;
