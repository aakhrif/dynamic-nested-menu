import { Injectable } from "@angular/core";
import Chance from "chance";
import { BehaviorSubject } from "rxjs";
// first runs tested with json data
import data from "./data.json";
import { MenuItem } from "./menu-item";

@Injectable()
export class ItemsService {
  private _selectedValue = new BehaviorSubject<string>("");
  private _menuItems = new BehaviorSubject<MenuItem[]>([]);
  private chance: Chance.Chance;

  readonly topLevelIterationsLimit: number = 4;
  readonly subIterationsLimit: number = 15;
  readonly minTopLevelItems: number = 2;

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
   *  Generate randomly some mock data
   *  persons (employees) sample data can present a hierarchy in a organisation
   * **/
  private getItems(limit: number, items: any[], choice: string): any[] {
    // build randomly some first level items
    var rdm = this.getRandomInt(0, 5);
    limit++;
    // continue to get at least 2 element
    if (rdm === 0 && limit <= this.minTopLevelItems) {
      rdm = 1;
    }
    if (limit < this.topLevelIterationsLimit) {
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
    additionalItems: any[],
    choice: string
  ): any[] {
    // foreach item build randomly subitems
    let returnedItems = [];
    items.forEach(item => {
      item.subItems["name"] = this.getRandomName(choice);
    });
    returnedItems = items.concat(additionalItems);
    limit++;
    let item: [] = [];
    item["name"] = this.getRandomName(choice);
    item["subItems"] = this.getRandomItem(choice);
    items.push(item);
    let iteraTelength = items.length - this.getRandomInt(1, items.length - 1);
    for (var index = 0; index < iteraTelength; index++) {
      item["name"] = this.getRandomName(choice);
      item["subItems"] = this.getRandomItem(choice);
      items[index].subItems.push(item);
    }

    item["name"] = this.getRandomName(choice);
    item["subItems"] = this.getRandomItem(choice);
    additionalItems.push(item);

    if (limit < this.subIterationsLimit) {
      // additionalItems and items in changed position to get some mix
      this.buildSubItems(limit, additionalItems, items, choice);
    }
    return returnedItems;
  }

  // helper functions can be exported in a separatly helper file
  private getRandomName(choice: string) {
    return choice == "persons" ? this.chance.name() : this.chance.animal();
  }

  private getRandomItem(choice: string) {
    let item: [] = [];
    item["name"] = this.getRandomName(choice);
    item["subItems"] = [];
    return item;
  }

  private getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
