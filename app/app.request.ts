import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { Http } from '@angular/http';
import { TimePicker } from "ui/time-picker";
import { Router } from "@angular/router";
import { Page } from "ui/page";
import 'rxjs/add/operator/map';

@Component({
    selector: "main",
    templateUrl: "app.request.html",
})

export class RequestComponent implements OnInit {
    public duration: string = "Nothing yet";
    public distance: string = "";
    public departure: string = "";
    public arrival: string = "";
    public departureTime: number = Date.now();
    public arrivalTime: Date = new Date();
    public estimatedArrival: number = 0;
    public callItIn: string = "";
    public onTime: boolean = false;

    constructor(private http: Http, private router: Router, private page: Page) {
    }

    ngOnInit() {
        this.page.actionBarHidden = true;
    }

    @ViewChild("timePicker") tp: ElementRef;

    configure(timePicker: TimePicker) {
        timePicker.hour = this.arrivalTime.getHours();
        timePicker.minute = this.arrivalTime.getMinutes();
    }

    public loadRemote() {
        this.http.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=` + this.departure + `&destinations=` + this.arrival + `&mode=car&departure_time=` + this.departureTime + `&language=en-EN&key=
        `).map(res => res.json()).subscribe((response: any) => {
                this.processResponse(response);
                this.compareTimes();
                this.router.navigate(["/result"], { queryParams: { result: this.callItIn, duration: this.duration, distance: this.distance, eta: new Date(this.estimatedArrival), onTime: this.onTime } });
            });
    }

    public processResponse(response) {
        this.duration = this.cleanString(JSON.stringify(response.rows[0].elements[0].duration.text));
        this.distance = this.cleanString(JSON.stringify(response.rows[0].elements[0].distance.text));
        this.estimatedArrival = this.departureTime + (response.rows[0].elements[0].duration.value * 1000);
        this.daySwitch();
    }

    public daySwitch() {
        let timePicker: TimePicker = <TimePicker>this.tp.nativeElement;
        this.arrivalTime.setHours(timePicker.hour, timePicker.minute);
        var currentTime = new Date();
        var currentHour = timePicker.hour == currentTime.getHours();
        var futureHour = timePicker.hour < currentTime.getHours();
        var futureMinute = timePicker.minute < currentTime.getMinutes()
        if (futureHour || currentHour && futureMinute) {
            this.arrivalTime.setDate(this.arrivalTime.getDate() + 1); //add 1 day, otherwise it calculates a useless comparison with a time that has already passed
        }
    }

    public cleanString(string) {
        var cleanString = string.replace(/"/g, '');
        return cleanString;
    }
    public compareTimes() {
        if (this.estimatedArrival > this.arrivalTime.getTime()) {
            this.callItIn = "Late";
        }
        else {
            this.callItIn = "On time";
            this.onTime = true;
        }
    }
}
