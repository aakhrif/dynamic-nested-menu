import { Component } from "@angular/core";
import { ItemsService } from "./../items.service";

@Component({
  selector: "app-menu-select",
  templateUrl: "./menu-select.component.html",
  styleUrls: ["./menu-select.component.scss"]
})
export class MenuSelectComponent {
  selectedValue: string = "animals";
  constructor(private _itemsService: ItemsService) {}

  public sendMenuChoice($event): void {
    // main trigger
    console.log($event);
    this._itemsService.loadItems(this.selectedValue);
  }
}
