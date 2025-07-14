import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductStoreService, Product } from '../product-store.service';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats.html',
  styleUrl: './stats.scss'
})
export class StatsComponent {
  constructor(public productStore: ProductStoreService) {}

  get products(): Product[] {
    return this.productStore.products();
  }

  totalProducts = computed(() => this.products.length);
  profitableProducts = computed(() => this.products.filter(p => p.meetsMinProfit).length);
  unprofitableProducts = computed(() => this.products.filter(p => !p.meetsMinProfit).length);
  profitabilityPercentage = computed(() => {
    if (this.totalProducts() === 0) return 0;
    return Math.round((this.profitableProducts() / this.totalProducts()) * 100);
  });
  totalProfit = computed(() => this.products.reduce((sum, product) => sum + (product.profitARS || 0), 0));
  totalCost = computed(() => this.products.reduce((sum, product) => sum + (product.totalCostARS || 0), 0));
  mostProfitableProduct = computed(() => {
    if (this.products.length === 0) return null;
    return this.products.reduce((max, current) => (current.profitARS || 0) > (max.profitARS || 0) ? current : max);
  });
  leastProfitableProduct = computed(() => {
    if (this.products.length === 0) return null;
    return this.products.reduce((min, current) => (current.profitARS || 0) < (min.profitARS || 0) ? current : min);
  });

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(amount);
  }

  formatPercentage(value: number): string {
    return `${value}%`;
  }

  getProfitabilityClass(percentage: number): string {
    if (percentage >= 70) return 'high-profit';
    if (percentage >= 40) return 'medium-profit';
    return 'low-profit';
  }
} 