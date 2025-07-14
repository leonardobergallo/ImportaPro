import { Injectable, signal } from '@angular/core';
import { ProductCalculatorService } from './product-calculator';

export interface Product {
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

@Injectable({ providedIn: 'root' })
export class ProductStoreService {
  constructor(private calculator: ProductCalculatorService) {}
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
    },
    {
      name: 'iPhone 15 Pro Max 256GB (Producto Ganador)',
      aliExpressPrice: 899.99,
      shipping: 15.00,
      seller: 'Premium Tech Store',
      totalCostUSD: 914.99,
      totalCostARS: 1280986,
      salePriceARS: 1383464.88,
      mlCommission: 179850.43,
      mpCommission: 96842.54,
      finalPriceARS: 1106771.91,
      profitARS: -174214.09,
      meetsMinProfit: false,
      category: 'APPLE'
    },
    {
      name: 'MacBook Pro M3 14" 512GB (Producto Ganador)',
      aliExpressPrice: 1299.99,
      shipping: 25.00,
      seller: 'Apple Premium Store',
      totalCostUSD: 1324.99,
      totalCostARS: 1854986,
      salePriceARS: 2003384.88,
      mlCommission: 260439.03,
      mpCommission: 140236.94,
      finalPriceARS: 1602708.91,
      profitARS: -252277.09,
      meetsMinProfit: false,
      category: 'APPLE'
    },
    {
      name: 'Producto Ganador Real - Smartphone Premium',
      aliExpressPrice: 250.00,
      shipping: 20.00,
      seller: 'Tech Winners Store',
      totalCostUSD: 270.00,
      totalCostARS: 378000,
      salePriceARS: 680000,
      mlCommission: 88400,
      mpCommission: 47600,
      finalPriceARS: 544000,
      profitARS: 166000,
      meetsMinProfit: true,
      category: 'SMARTPHONES'
    }
  ]);

  addProduct(product: Product) {
    console.log('ProductStoreService.addProduct() llamado con:', product);
    console.log('Productos antes de actualizar:', this.products());
    
    this.products.update(products => {
      const newProducts = [...products, product];
      console.log('Nueva lista de productos:', newProducts);
      return newProducts;
    });
    
    console.log('Productos después de actualizar:', this.products());
  }

  // Método para agregar o actualizar un producto
  addOrUpdateProduct(productInput: any) {
    // Calcula el producto completo usando el servicio inyectado
    const productCalculado = this.calculator.calculate(productInput);
    
    // Por ahora solo agrega (podríamos implementar lógica de edición después)
    this.addProduct(productCalculado);
  }

  removeProduct(index: number) {
    this.products.update(products => {
      const newProducts = products.slice();
      newProducts.splice(index, 1);
      return newProducts;
    });
  }
} 