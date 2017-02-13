import { Component } from "@angular/core";
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})
export class AppComponent {
    public info: string = "Nothing yet";

    public get message(): string {
        return this.info;
    }
    constructor(private http: Http) {
    }
    public loadRemote() {
        this.http.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=Vancouver+BC|Seattle&destinations=San+Francisco|Victoria+BC&mode=bicycling&language=fr-FR&key=APIKEY
        `).map(res => res.json()).subscribe((response: any) => {
                this.info = JSON.stringify(response);
            });
    }
}
