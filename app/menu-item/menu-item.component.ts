import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { MenuItem } from "../menu-item";

@Component({
  selector: "app-menu-item",
  templateUrl: "./menu-item.component.html",
  styleUrls: ["./menu-item.component.scss"]
})
export class MenuItemComponent implements OnInit {
  @Input() items: MenuItem[];
  // reference to child component
  @ViewChild("childMenu") public childMenu;

  constructor() {}

  ngOnInit() {}
}
