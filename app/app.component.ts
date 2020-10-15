import { Component, ViewEncapsulation } from "@angular/core";
import { VERSION } from "@angular/material";

@Component({
  selector: "material-app",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  version = VERSION;
}
