import { Injectable } from "@angular/core";
import Chance from "chance";
import { BehaviorSubject } from "rxjs";
import data from "./data.json";
import { MenuItem } from "./nav-item";

@Injectable()
export class ItemsService {
  private _selectedValue = new BehaviorSubject<string>("");
  private _menuItems = new BehaviorSubject<any[]>([]);
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
    return this._menuItems.next(this.getItems(0, [], choice));
  }

  /**
   *  Generate randomly some mock data, persons (employees), animals
   * randomly return top level
   * **/
  private getItems(limit: number, items: any[], choice: string): any[] {
    // build randomly some first level items
    var rdm = this.getRandomInt(0, 5);
    limit++;
    // continue to get at least 2 element
    if (rdm === 0 && limit <= 2) {
      rdm = 1;
    }
    if (limit < 4) {
      if (0 !== rdm) {
        let item: [] = [];
        item["name"] =
          choice == "persons" ? this.chance.name() : this.chance.animal();
        item["subItems"] = [];
        items.push(item);
        return this.getItems(limit, items, choice);
      }
    }
    return this.buildSubItems(0, items, [], choice);
  }

  private buildSubItems(
    limit: number,
    items: any[],
    currentItems: any[],
    choice: string
  ): any[] {
    // foreach item build randomly subitems
    //debugger;
    items = items.concat(currentItems);
    limit++;
    console.log(limit);
    debugger;
    for (var index = 0; index < items.length; index++) {
      items[index].subItems.push(this.getRandomItem(choice));
      for (var i = 0; i < items[index].subItems.length; i++) {
        console.log(items[index].subItems[i]);
        debugger;
        items[index].subItems[i].push(this.getRandomItem(choice));
      }
    }
    currentItems = items;
    console.log(currentItems);
    //items.forEach(item => item.subItems.push(this.getRandomItem(choice)));
    console.log(items);

    if (limit < 5) {
      this.buildSubItems(limit, items, currentItems, choice);
    }
    //console.log(items);
    return items;
  }

  private getRandomName(choice) {
    return choice == "persons" ? this.chance.name() : this.chance.animal();
  }

  private getRandomItem(choice) {
    let item: [] = [];
    item["name"] = this.getRandomName(choice);
    item["subItems"] = [];
    return item;
  }

  private getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
