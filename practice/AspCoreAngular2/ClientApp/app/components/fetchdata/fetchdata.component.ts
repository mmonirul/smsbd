import { Component, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as models from '../../interfaces/common';

@Component({
    selector: 'fetchdata',
    templateUrl: './fetchdata.component.html'
})
export class FetchDataComponent {
    public forecasts: models.WeatherForecast[];
    public headers: any = null;

    private jsonData: any = {};

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        //this.headers.append('Access-Control-Allow-Origin', '*');

        http.get(baseUrl + 'api/SampleData/WeatherForecasts').subscribe(result => {
            this.forecasts = result.json() as models.WeatherForecast[];
        }, error => console.error(error));


        http.get('http://localhost:50008/api/trips').subscribe(result => {
            console.log(result.json());
        }, error => console.error(error));

        http.get('http://date.jsontest.com', { headers: this.headers}).subscribe(result => {
            this.jsonData = result.json();
            console.log(this.jsonData.time + ' - '+ this.jsonData.date);
        }, error => console.error(error));

        


    }
}
