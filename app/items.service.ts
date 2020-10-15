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
    console.log(`event choosed: ${choice}`);
    console.log(this.getItems(0, [], choice));
    this._selectedValue.next(choice);
    return this._menuItems.next(data);
  }

  /**
   *  Generate randomly some mock data, persons (employees), animals
   * randomly return top level items between 2 and 5
   * **/
  getItems(limit: number, items: any[], choice: string): any[] {
    // build randomly some first level items
    var rdm = this.getRandomInt(0, 5);
    limit++;
    // continue to get at least 2 element
    if (rdm === 0 && limit <= 2) {
      rdm = 1;
    }
    // console.log("rdm" + rdm);
    // console.log("limit" + limit);
    // console.log(items);
    if (limit < 6) {
      if (0 !== rdm) {
        let item: [] = [];
        item["name"] =
          choice == "persons" ? this.chance.name() : this.chance.animal();
        item["subItems"] = [];
        items.push(item);
        return this.getItems(limit, items, choice);
      }
    }
    //return items;
    return this.buildSubItems(0, items, choice);
  }

  buildSubItems(limit: number, items: any[], choice: string): any[] {
    // foreach item build randomly subitems
    let item: [] = [];
    for (var i in items) {
      item["name"] =
        choice == "persons" ? this.chance.name() : this.chance.animal();
      item["subItems"] = [];
      if (Math.random() >= 0.5) items[i].subItems.push(item);
    }
    console.log(limit);
    // build sub of subs
    if (limit < 3) {
      this.buildSubItems(limit++, items, choice);
    }
    return items;
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
