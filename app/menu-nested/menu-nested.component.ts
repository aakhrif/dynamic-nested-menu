import { Component, OnInit } from "@angular/core";
import { ItemsService } from "../items.service";
import { MenuItem } from "../nav-item";

@Component({
  selector: "app-menu-nested",
  templateUrl: "./menu-nested.component.html",
  styleUrls: ["./menu-nested.component.scss"]
})
export class MenuNestedComponent implements OnInit {
  items: MenuItem[];
  selectedValue: string;
  constructor(private _itemsService: ItemsService) {}

  ngOnInit(): void {
    this._itemsService.menuItems.subscribe(menuItems => {
      console.log(`event returned data: ${menuItems}`);
      console.log(menuItems);
      this.items = menuItems;
    });

    this._itemsService.selectedValue.subscribe(selectedValue => {
      this.selectedValue = selectedValue;
    });
  }
}
