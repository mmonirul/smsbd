import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class FetchDataServices {

    constructor(private http: Http) { }

    getLocalHostData() {

    };

    getExternalData() {
        return this.http.get('http://date.jsontest.com').map(response => response.json());
    }

    getJsonTypicodeData() {
        return this.http.get('https://jsonplaceholder.typicode.com/users').map(res => res.json());
    }


}
