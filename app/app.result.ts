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
    public eta: string = "";
    isLoading = false;

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
                this.eta = params['eta'];
            });
        this.isLoading = false;
    }

    public back() {
        this.router.navigate(["/"]);
    }
}