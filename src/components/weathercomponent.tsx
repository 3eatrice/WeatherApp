import React, { useState, FC } from 'react';
import { observer } from 'mobx-react-lite';
import WeatherStore from '../weather.store';
import 'bootstrap/dist/css/bootstrap.min.css';

const WeatherComponent: FC = observer(() => {
  const [city, setCity] = useState<string>('');

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  return (
    <div>
      <label htmlFor="cityInput">Stadt eingeben:</label>
      <input
        type="text"
        id="cityInput"
        className="input-group"
        value={city}
        onChange={handleCityChange}
        placeholder="Geben Sie eine Stadt ein"
      />
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          WeatherStore.getCoordinates(city);
        }}
      >
        Wetterdaten abrufen
      </button>

      <div>
        {WeatherStore.weatherData ? (
          <div>
            <h2>Wetterdaten für {city}</h2>
            <div>
                {WeatherStore.weatherData.hourly.temperature_2m} °C
            </div>
          </div>
        ) : (
          <p>Keine Wetterdaten verfügbar</p>
        )}
      </div>
    </div>
  );
});

export default WeatherComponent;
