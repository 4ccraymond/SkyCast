# Weather Dashboard

This project is a **Weather Dashboard** application that allows users to search for weather forecasts for any city. The backend uses the OpenWeather API to retrieve real-time weather data and provides endpoints for managing search history. The application is built with **TypeScript**, **Express**, and a static front-end client.

## Features

- **Search Current and Future Weather**:
  - Retrieve current weather conditions for a city, including temperature, humidity, wind speed, and weather descriptions.
  - View a 5-day weather forecast, showing weather data at a fixed time (12:00 PM) each day.
- **Search History Management**:
  - Save search history to a JSON file.
  - Retrieve and display search history.
  - Delete individual cities from the search history.
- **Static Client Integration**:
  - Serve the front-end application from a static folder.
  - Use wildcard routes to enable client-side routing.

## File Structure

```
weatherAPI/
├── src/
│   ├── server.ts
│   ├── routes/
│   │   ├── index.ts
│   │   ├── htmlRoutes.ts
│   │   └── weatherRoutes.ts
│   ├── services/
│   │   ├── weatherService.ts
│   │   └── historyService.ts
│   └── data/
│       └── searchHistory.json
├── client/
│   └── dist/
├── .env
├── package.json
└── tsconfig.json
```

## Future Enhancements

- Add user authentication to save personalized search histories.
- Implement caching to reduce redundant API calls.
- Enhance the front-end with responsive UI/UX.
- Allow users to choose different forecast times instead of the default 12:00 PM.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- [OpenWeather API](https://openweathermap.org/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- ChatGPT and CoPilot for coding assistance and recommendations.
- EdX bootcamp course instructors and TAs for their guidance and support.