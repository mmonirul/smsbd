import { HttpClient } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
import {IWeatherForecast } from '../../interfaces/fetchdata.interface'

@inject(HttpClient)
export class Fetchdata {
    public forecasts: IWeatherForecast[];

    constructor(private http: HttpClient) {
        //this._Http = http;
        this.GetData();
    }
    GetData() {
        this.http.fetch('/api/SampleData/WeatherForecasts')
            .then(result => result.json() as Promise<IWeatherForecast[]>)
            .then(data => {
                this.forecasts = data;
            });
    }
    showAlert() {
        alert('showAlert()');
    }
}

