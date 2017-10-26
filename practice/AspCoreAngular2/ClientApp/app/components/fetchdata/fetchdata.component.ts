import { Component, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { FetchDataServices } from '../../services/fetch-data.service';
import * as models from '../../interfaces/common';


@Component({
    selector: 'fetchdata',
    templateUrl: './fetchdata.component.html',
    providers: [FetchDataServices]
})
export class FetchDataComponent {
    public forecasts: models.WeatherForecast[];
    
    private jsonData: any = {};

    constructor(http: Http, private _fetchDataService: FetchDataServices, @Inject('BASE_URL') baseUrl: string) {

        http.get(baseUrl + 'api/SampleData/WeatherForecasts').subscribe(result => {
            this.forecasts = result.json() as models.WeatherForecast[];
        }, error => console.error(error));

        this.getData();
        this.getJsonTypiCode();
        //http.get('http://localhost:50008/api/trips').subscribe(result => {
        //    console.log(result.json());
        //}, error => console.error(error));

        //http.get('http://date.jsontest.com').subscribe(result => {
        //    this.jsonData = result.json();
        //    console.log(this.jsonData.time + ' - '+ this.jsonData.date);
        //}, error => console.error(error));
    }

    getData(): void {
        this._fetchDataService.getExternalData().subscribe(result => {
            this.jsonData = result;
            console.log(this.jsonData);
        }, error => console.log(error))
    }

    getJsonTypiCode(): void {
        this._fetchDataService.getJsonTypicodeData().subscribe(result => {
            console.log(result);
        }, error => console.log(error))
    }
}
