import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { WeatherData } from './interface';

class WeatherStore {
    public weatherData: WeatherData | undefined;

    public cityLatitude: number | undefined;
    public cityLongtude: number | undefined;


    constructor() {
        makeAutoObservable(this);
    }

    public async getCoordinates(city: string): Promise<void> {
        try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${city}&format=json`)
            if(response.data) {
                const {lat, lon} = response.data[0];

                this.cityLatitude = parseFloat(lat);
                this.cityLongtude = parseFloat(lon);

                await this.getWeatherData(this.cityLatitude, this.cityLongtude)
            }

        } catch (error) {
            console.log("Fehler beim Aufrufen der Koordinaten", error)
        }
    }

    public async getWeatherData(latitude: number, longitude: number): Promise<void> {
        try {
            const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
                params: {
                    latitude,
                    longitude,
                    hourly: 'temperature_2m',
                },
            });
            this.weatherData = response.data;
            console.log(response.data);
        } catch (error) {
            console.log('Fehler beim Abrufen der Wetterdaten', error);
        }
    }
}

export default new WeatherStore();
