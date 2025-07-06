import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

// 🔍 INTERFAZ PRODUCT - Define la estructura de datos
// En JavaScript no tendrías esto, en TypeScript es obligatorio
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
}

@Component({
  selector: 'app-product-table',
  imports: [CommonModule],
  templateUrl: './product-table.html',
  styleUrl: './product-table.scss'
})
export class ProductTable {
  @Input() products: Product[] = [];

  // 🎯 MÉTODOS PARA CÁLCULOS DEL RESUMEN
  getTotalProducts(): number {
    return this.products.length;
  }

  getProfitableProducts(): number {
    return this.products.filter(p => p.meetsMinProfit).length;
  }

  getUnprofitableProducts(): number {
    return this.products.filter(p => !p.meetsMinProfit).length;
  }

  // 🎯 MÉTODO PARA CALCULAR GANANCIA (ejemplo de lógica de negocio)
  calculateProfit(product: Product): number {
    return (product.finalPriceARS ?? 0) - (product.totalCostARS ?? 0);
  }
}
