/*
============================================
FLUJO DE ABM, EDICIÓN Y MARKUP EN ANGULAR
============================================
- Este archivo es el componente principal de la app (AppComponent).
- Centraliza el estado global de productos y la lógica de alta, baja y modificación (ABM).
- Conecta el formulario y la tabla usando @Input/@Output y signals.
- Usa ProductCalculatorService para calcular los valores derivados de cada producto.
*/

import { Component, signal } from '@angular/core'; // Importa decoradores y signal para estado reactivo
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router'; // Importa RouterOutlet, RouterLink y RouterLinkActive para routing SPA
import { ProductTable } from './product-table/product-table'; // Tabla de productos
import { ProductFormComponent } from './product-form/product-form'; // Formulario de alta/edición
import { StatsComponent } from './stats/stats'; // Estadísticas
import { ProductCalculatorService, ProductInput } from './product-calculator'; // Servicio de lógica de negocio

// Interfaz Product: representa un producto completo con todos los campos calculados
interface Product {
  name: string;
  aliExpressPrice: number;
  shipping: number;
  seller: string;
  totalCostUSD?: number;
  totalCostARS?: number;
  salePriceARS?: number;
  mlCommission?: number;
  mpCommission?: number;
  finalPriceARS?: number;
  profitARS?: number;
  meetsMinProfit?: boolean;
  category?: string;
  puertaAPuerta?: boolean;
  markup?: number;
}

@Component({
  selector: 'app-root',
  // IMPORTANTE: RouterOutlet, RouterLink y RouterLinkActive permiten el routing SPA y el resaltado de links activos
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ProductFormComponent, StatsComponent, ProductTable],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  // Signal: estado global reactivo de productos (como useState global en React, pero más eficiente)
  products = signal<Product[]>([
    {
      name: 'AirPods Pro 2 (95% nuevos)',
      aliExpressPrice: 29.47,
      shipping: 0,
      seller: 'Shop1104492410 Store',
      totalCostUSD: 29.47,
      totalCostARS: 41258,
      salePriceARS: 44558.64,
      mlCommission: 5792.62,
      mpCommission: 3119.10,
      finalPriceARS: 35646.91,
      profitARS: -5611.09,
      meetsMinProfit: false,
      category: 'APPLE'
    },
    {
      name: 'Auriculares P9 Pro Max',
      aliExpressPrice: 14.90,
      shipping: 3.10,
      seller: 'Shop1104863216 Store',
      totalCostUSD: 18.00,
      totalCostARS: 25200,
      salePriceARS: 27216,
      mlCommission: 3538.08,
      mpCommission: 1905.12,
      finalPriceARS: 21772.8,
      profitARS: -3427.2,
      meetsMinProfit: false,
      category: 'APPLE'
    },
    {
      name: 'Cargador 20W + USB-C Lightning',
      aliExpressPrice: 5.35,
      shipping: 0,
      seller: 'Shop1102962344 Store',
      totalCostUSD: 5.35,
      totalCostARS: 7490,
      salePriceARS: 8089.2,
      mlCommission: 1051.60,
      mpCommission: 566.24,
      finalPriceARS: 6471.36,
      profitARS: -1018.64,
      meetsMinProfit: false,
      category: 'APPLE'
    }
  ]);

  // Variables para edición: guardan el producto y el índice a editar
  editingProduct: ProductInput | null = null;
  editingIndex: number | null = null;

  // Inyecta el servicio de lógica de negocio (como un custom hook en React, pero con DI de Angular)
  constructor(private productCalculator: ProductCalculatorService) {}

  /**
   * Agrega o actualiza un producto en el array global.
   * Si editingIndex es null, agrega (alta). Si no, actualiza (modificación).
   * Llama al servicio para calcular todos los valores derivados.
   */
  onAddOrUpdateProduct(newProduct: ProductInput) {
    const productoCalculado = this.productCalculator.calculate(newProduct);
    if (this.editingIndex !== null) {
      // Modificación: reemplaza el producto en la posición correspondiente
      this.products.update(products => {
        const updated = [...products];
        updated[this.editingIndex!] = productoCalculado;
        return updated;
      });
      this.editingProduct = null;
      this.editingIndex = null;
    } else {
      // Alta: agrega el producto al final del array
      this.products.update(products => [...products, productoCalculado]);
    }
  }

  /**
   * Handler para el evento de edición emitido por ProductTable.
   * Convierte Product a ProductInput y guarda el índice para edición.
   * Así el formulario puede mostrar los datos y editar.
   */
  onEditProduct(event: {product: Product, index: number}) {
    const { product, index } = event;
    this.editingProduct = {
      name: product.name,
      aliExpressPrice: product.aliExpressPrice,
      shipping: product.shipping,
      seller: product.seller,
      category: product.category || '',
      puertaAPuerta: product.puertaAPuerta ?? false,
      salePriceARS: product.salePriceARS ?? undefined,
      markup: product.markup ?? undefined,
    };
    this.editingIndex = index;
  }

  // Ejemplo de función extra (no afecta el ABM)
  startLearning() {
    alert('¡Bienvenido a ImportaPro! Vamos a aprender Angular paso a paso.');
  }
}
