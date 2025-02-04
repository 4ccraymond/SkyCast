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

## Technologies Used

- **Backend**:
  - TypeScript
  - Node.js
  - Express
- **Frontend**:
  - Static client served from `dist` folder (e.g., React, Vue, or vanilla JS).
- **APIs**:
  - OpenWeather API (5-day weather forecast).
- **Data Management**:
  - File system for search history (JSON storage).

## Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:4ccraymond/weatherAPI.git
   cd weatherAPI
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root of the project and add your OpenWeather API key:
     ```env
     API_KEY=your_openweather_api_key
     ```

4. Build the client (if applicable):
   - Ensure your client files are built and placed in the `client/dist` folder.

5. Start the server:
   ```bash
   npm run start
   ```

## API Endpoints

### Weather Routes

#### `POST /api/weather`
- **Description**: Fetch weather data for a city and save it to the search history.
- **Request Body**:
  ```json
  {
    "city": "City Name"
  }
  ```
- **Response**:
  ```json
  [
    {
      "date": "2025-01-01",
      "description": "clear sky",
      "temperature": 72,
      "humidity": 40,
      "windSpeed": 5,
      "icon": "04d"
    },
    {
      "date": "2025-01-02",
      "description": "cloudy",
      "temperature": 70,
      "humidity": 50,
      "windSpeed": 3,
      "icon": "03n"
    }
  ]
  ```

#### `GET /api/weather/history`
- **Description**: Retrieve the search history.
- **Response**:
  ```json
  [
    {
      "id": "123",
      "name": "City Name"
    }
  ]
  ```

#### `DELETE /api/weather/history/:id`
- **Description**: Remove a city from the search history by its ID.
- **Response**:
  ```json
  {
    "message": "City removed successfully"
  }
  ```

### HTML Routes

#### `GET *`
- **Description**: Serve the `index.html` file from the `dist` folder for all non-API routes.

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

