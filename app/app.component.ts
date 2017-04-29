import { Component } from "@angular/core";
import { TNSFontIconService } from 'nativescript-ng2-fonticon';

@Component({
    selector: "main",
    template: "<page-router-outlet></page-router-outlet>"
})
export class AppComponent { constructor(private fonticon: TNSFontIconService) { } }