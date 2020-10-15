import { Injectable } from "@angular/core";
import Chance from "chance";
import { BehaviorSubject } from "rxjs";
import data from "./data.json";

@Injectable()
export class ItemsService {
  private _selectedValue = new BehaviorSubject<string>("");
  private _menuItems = new BehaviorSubject<[]>([]);
  private chance: Chance.Chance;

  constructor() {
    this.chance = new Chance();
  }

  get menuItems() {
    return this._menuItems.asObservable();
  }

  get selectedValue() {
    return this._selectedValue.asObservable();
  }

  loadItems(choice: string) {
    this._selectedValue.next(choice);
    return this._menuItems.next(data);
  }
}
