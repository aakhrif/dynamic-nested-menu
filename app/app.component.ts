import { Component, ViewEncapsulation } from "@angular/core";
import { VERSION } from "@angular/material";
import { NavItem } from "./nav-item";
import data from "./data.json";

@Component({
  selector: "material-app",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  version = VERSION;
  items: NavItem[] = data;
}
