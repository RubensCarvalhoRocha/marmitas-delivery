import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [ButtonModule, CommonModule, TableModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css',
})
export class PedidosComponent {
  products: any[] = [
    {
      name: 'Product 1',
      price: 29.99,
      image: 'product1.jpg',
    },
    {
      name: 'Product 2',
      price: 49.99,
      image: 'product2.jpg',
    },
  ];

  constructor(private router: Router) {}

  navigateTo(id: string): void {
    this.router.navigate(['/pedidos', id]);
  }
}
