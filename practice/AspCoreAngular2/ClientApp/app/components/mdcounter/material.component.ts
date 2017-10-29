import { Component } from '@angular/core';

@Component({
    selector: 'mdcounter',
    templateUrl: './material.component.html',
    styleUrls: ['./style.scss']
})
export class MaterialComponent {

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
