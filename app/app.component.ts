import { Component } from "@angular/core";
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})
export class AppComponent {
    public duration: string = "Nothing yet";
    public durationTraffic: string = "";
    public departure: string = "";
    public arrival: string = "";
    public debug = this.departure + this.arrival;
    public departureTime: number = Date.now();

    public get message(): string {
        return this.duration;
    }
    public get durationTraf(): string {
        return this.durationTraffic;
    }
    constructor(private http: Http) {
    }
    public loadRemote() {
        this.http.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=` + this.departure + `&destinations=` + this.arrival + `&mode=car&departure_time=` + this.departureTime + `&language=en-EN&key=YOURKEY
        `).map(res => res.json()).subscribe((response: any) => {
                this.duration = "Duration: " + this.cleanString(JSON.stringify(response.rows[0].elements[0].duration.text));
                this.durationTraffic = "Duration in traffic: " + this.cleanString(JSON.stringify(response.rows[0].elements[0].duration_in_traffic.text));
            });
    }
    public cleanString(string) {
        var cleanString = string.replace(/"/g, '');
        return cleanString;
    }
}
