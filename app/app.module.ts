import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { TNSFontIconModule } from 'nativescript-ng2-fonticon';

import { AppComponent } from "./app.component";
import { routes, navigatableComponents } from "./app.routing";

@NgModule({
    declarations: [AppComponent, navigatableComponents],
    bootstrap: [AppComponent],
    imports: [NativeScriptModule,
        NativeScriptHttpModule, NativeScriptFormsModule, NativeScriptRouterModule,
        NativeScriptRouterModule.forRoot(routes), TNSFontIconModule.forRoot({
            'mdi': 'material-design-icons.css'
        })],
    exports: [
        NativeScriptModule,
        NativeScriptHttpModule, NativeScriptFormsModule
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
