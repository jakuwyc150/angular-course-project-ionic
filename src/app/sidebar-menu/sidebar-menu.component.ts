import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
})
export class SidebarMenuComponent implements OnInit {
  isManageShown = false;

  constructor() {}

  ngOnInit() {}

  hideSubmenus() {
    this.isManageShown = false;
  }

  toggleManage() {
    this.isManageShown = !this.isManageShown;
  }
}
