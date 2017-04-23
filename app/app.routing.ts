import { RequestComponent } from "./app.request";
import { ResultComponent } from "./app.result";

export const routes = [
    { path: "", component: RequestComponent },
    { path: "result", component: ResultComponent }
];

export const navigatableComponents = [
    RequestComponent, ResultComponent
];