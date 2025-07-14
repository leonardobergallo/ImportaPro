/*
============================================
ProductTable (Tabla de Productos)
============================================
- Muestra la lista de productos.
- Tiene botones para editar y eliminar cada producto.
- Al hacer clic en "Editar", emite el producto y su índice por @Output (edit) para que el formulario lo reciba.
- Al hacer clic en "Eliminar", llama al servicio global para quitar el producto.
- En Angular, la comunicación entre componentes se hace con @Output y EventEmitter.
- En React, usarías props/callbacks o un estado global (Redux/Context).
- TypeScript ayuda a tipar los datos y evitar errores.
*/

import { Component, Output, EventEmitter } from '@angular/core'; // Decoradores y utilidades Angular
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Para navegar al formulario
import { ProductStoreService, Product } from '../product-store.service';
import { EditProductService } from '../edit-product.service'; // Servicio de edición

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-table.html',
  styleUrl: './product-table.scss'
})
export class ProductTable {
  // Emite el producto y el índice a editar al componente principal
  @Output() edit = new EventEmitter<{product: Product, index: number}>();

  constructor(
    public productStore: ProductStoreService,
    private editService: EditProductService, // Servicio de edición
    private router: Router // Router para navegación
  ) {}

  // Devuelve la lista de productos reactiva
  get products(): Product[] {
    return this.productStore.products();
  }

  // Elimina un producto por índice usando el servicio global
  removeProduct(index: number) {
    this.productStore.removeProduct(index);
  }

  // Guarda el producto a editar en el servicio y navega al formulario
  editProduct(index: number) {
    // Guarda el producto y el índice en el servicio global
    this.editService.setEditProduct(this.products[index], index);
    // Navega al formulario para editar
    this.router.navigate(['/']);
  }

  // Métodos auxiliares para estadísticas (no afectan el ABM)
  getTotalProducts(): number {
    return this.products.length;
  }
  getProfitableProducts(): number {
    return this.products.filter(p => p.meetsMinProfit).length;
  }
  getUnprofitableProducts(): number {
    return this.products.filter(p => !p.meetsMinProfit).length;
  }
  calculateProfit(product: Product): number {
    return (product.finalPriceARS ?? 0) - (product.totalCostARS ?? 0);
  }
}
