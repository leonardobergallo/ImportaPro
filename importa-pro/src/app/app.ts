import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductTable } from './product-table/product-table';
import { ProductFormComponent } from './product-form/product-form';

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
  selector: 'app-root',
  imports: [RouterOutlet, ProductTable, ProductFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'importa-pro';

  products: Product[] = [
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
  ];

  onAddProduct(newProduct: Product) {
    const productoCompleto: Product = {
      ...newProduct,
      totalCostUSD: newProduct.totalCostUSD ?? 0,
      totalCostARS: newProduct.totalCostARS ?? 0,
      salePriceARS: newProduct.salePriceARS ?? 0,
      mlCommission: newProduct.mlCommission ?? 0,
      mpCommission: newProduct.mpCommission ?? 0,
      finalPriceARS: newProduct.finalPriceARS ?? 0,
      profitARS: newProduct.profitARS ?? 0,
      meetsMinProfit: newProduct.meetsMinProfit ?? false,
      category: newProduct.category ?? ''
    };
    this.products = [...this.products, productoCompleto];
  }

  startLearning() {
    alert('¡Bienvenido a ImportaPro! Vamos a aprender Angular paso a paso.');
  }
}
