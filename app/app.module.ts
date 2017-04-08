import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { AppComponent } from "./app.component";

@NgModule({
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    imports: [NativeScriptModule,
        NativeScriptHttpModule, NativeScriptFormsModule],
    exports: [
        NativeScriptModule,
        NativeScriptHttpModule, NativeScriptFormsModule
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
