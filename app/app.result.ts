import { Component, OnInit } from "@angular/core";
import { Page } from "ui/page";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: "result",
    templateUrl: "app.result.html"
})
export class ResultComponent {

    public callItIn: string = "";
    public duration: string = "";
    public distance: string = "";
    public eta: string = "";
    public resStyle: string = "green";
    public resIcon: string = "'mdi-directions-car' | fonticon";
    isLoading = false;
    onTime = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private page: Page) { }

    ngOnInit() {
        this.page.actionBarHidden = true;
        this.isLoading = true;
        var sub = this.route
            .queryParams
            .subscribe(params => {
                this.callItIn = params['result'];
                this.duration = params['duration'];
                this.distance = params['distance'];
                this.eta = params['eta'];
                this.setStyle(params['onTime']);
            });
        this.isLoading = false;
    }

    public back() {
        this.router.navigate(["/"]);
    }

    public setStyle(onTime) {
        if (onTime == "true") {
            this.resStyle = "green";
            this.onTime = true;
        } else {
            this.resStyle = "red";
            this.resIcon = "'mdi-local-phone' | fonticon";
        }
    }
}