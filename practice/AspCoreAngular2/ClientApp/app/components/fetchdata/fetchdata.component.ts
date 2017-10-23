import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import * as models from '../../interfaces/common';

@Component({
    selector: 'fetchdata',
    templateUrl: './fetchdata.component.html'
})
export class FetchDataComponent {
    public forecasts: models.WeatherForecast[];
    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        http.get(baseUrl + 'api/SampleData/WeatherForecasts').subscribe(result => {
            this.forecasts = result.json() as models.WeatherForecast[];
        }, error => console.error(error));
    }
}

//interface WeatherForecast {
//    dateFormatted: string;
//    temperatureC: number;
//    temperatureF: number;
//    summary: string;
//}
