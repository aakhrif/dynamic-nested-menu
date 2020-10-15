import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NavItem} from '../nav-item';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {
  @Input() items: NavItem[];
  @ViewChild('childMenu') public childMenu;

  constructor() {
  }

  ngOnInit() {
  }
}
