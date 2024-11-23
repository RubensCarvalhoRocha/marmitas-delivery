import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutService } from './service/app.layout.service';
import { RouterModule } from '@angular/router';
import { AppMenuitemComponent } from './app.menuitem.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, AppMenuitemComponent],
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
  model: any[] = [];

  constructor(public layoutService: LayoutService) {}

  ngOnInit() {
    this.model = [
      {
        items: [
          {
            label: 'Pedidos',
            icon: 'pi pi-fw pi-box',
            routerLink: ['/pedidos'],
          },
        ],
      },
      {
        items: [
          { label: 'Rotas', icon: 'pi pi-fw pi-map', routerLink: ['/rotas'] },
        ],
      },
    ];
  }
}
