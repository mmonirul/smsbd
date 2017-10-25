import { Component } from '@angular/core';

@Component({
    selector: 'counter',
    templateUrl: './counter.component.html',
    styleUrls: ['./style.scss']
})
export class CounterComponent {

    constructor() {
    }
        
    public currentCount = 5;

    public incrementCounter() {
        this.currentCount++;
    }
    public decrementCounter() {
        this.currentCount--;
    }
}
