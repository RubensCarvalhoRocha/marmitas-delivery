import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';

import { MenuModule } from 'primeng/menu';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    TableModule,
    FormsModule,
    MenuModule,
    StyleClassModule,
    PanelMenuModule,
    InputTextModule
  ],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css',
})
export class PedidosComponent {
  products: any[] = [
    {
      name: 'Product 1',
      price: 29.99,
      image: 'product1.jpg',
      endereco: 'Rua 1, 123',
    },
    {
      name: 'Product 2',
      price: 49.99,
      image: 'product2.jpg',
      endereco: 'Av teste, 20',
    },
  ];

  @ViewChild('filter') filter!: ElementRef;

  constructor(private router: Router) {}

  navigateTo(id: string): void {
    this.router.navigate(['/pedidos', id]);
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
