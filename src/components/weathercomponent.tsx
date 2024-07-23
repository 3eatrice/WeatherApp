import React, { useState, FC } from 'react';
import { observer } from 'mobx-react-lite';
import WeatherStore from '../weather.store';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../weathercomponent.css';

const WeatherComponent: FC = observer(() => {
  const [city, setCity] = useState<string>('');

  const handleCityChange = (event: { target: HTMLInputElement }) => {
    setCity(event.target.value);
  };

  return (
    <div className="container">
      <div className="input-group my-3">
        <input
          type="text"
          id="cityInput"
          className="form-control"
          value={city}
          onChange={handleCityChange}
          placeholder="Geben Sie eine Stadt ein"
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => WeatherStore.getCoordinates(city)}
        >
          Wetterdaten abrufen
        </button>
      </div>

      <div className="weather-info card p-3">
        {WeatherStore.weatherData ? (
          <div>
            <h2 className="card-title">Wetterdaten für {city}</h2>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Zeit</th>
                  <th>Temperatur (°C)</th>
                </tr>
              </thead>
              <tbody>
                {WeatherStore.weatherData.hourly.time.map(
                  (time: string, index: number) => (
                    <tr key={index}>
                      <td>{new Date(time).toLocaleTimeString()}</td>
                      <td>
                        {WeatherStore.weatherData?.hourly.temperature_2m[index]}{' '}
                        °C
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-muted">Keine Wetterdaten verfügbar</p>
        )}
      </div>
    </div>
  );
});

export default WeatherComponent;
