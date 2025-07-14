/*
============================================
ProductCalculatorService (Lógica de Negocio)
============================================
- Calcula todos los valores derivados: costo total, precio de venta, comisiones, ganancia, etc.
- Si se pasa markup, calcula el precio de venta como costo total * (1 + markup/100).
- Si no, usa el precio de venta manual o el sugerido (costo total + ganancia mínima).
- Centraliza la lógica de negocio para que todos los componentes usen la misma fórmula.
- En Angular, los servicios permiten compartir lógica y estado entre componentes.
- En React, podrías usar hooks personalizados o helpers, pero no hay un sistema de inyección de dependencias nativo.
- TypeScript ayuda a tipar los datos y evitar errores.
*/

import { Injectable } from '@angular/core'; // Decorador para servicios Angular
import {
  DOLAR_ESTIMADO, COMISION_ML, COMISION_MP, GANANCIA_MINIMA, COSTO_CORREO, IVA, PAIS, AFIP, BBPP
} from './constants'; // Constantes de negocio

// Interfaz de entrada: datos básicos del producto
export interface ProductInput {
  name: string;
  aliExpressPrice: number;
  shipping: number;
  seller: string;
  category: string;
  puertaAPuerta?: boolean;
  salePriceARS?: number; // Precio de venta manual
  markup?: number; // % de ganancia
}

// Interfaz de salida: producto con todos los campos calculados
export interface ProductCalculated extends ProductInput {
  totalCostUSD: number;
  totalCostARS: number;
  salePriceARS: number;
  mlCommission: number;
  mpCommission: number;
  finalPriceARS: number;
  profitARS: number;
  meetsMinProfit: boolean;
}

@Injectable({ providedIn: 'root' })
export class ProductCalculatorService {
  /**
   * Calcula todos los valores derivados del producto.
   * Aplica la lógica de impuestos, comisiones y markup.
   * Devuelve un objeto ProductCalculated listo para mostrar en la tabla.
   */
  calculate(product: ProductInput): ProductCalculated {
    // Suma el precio y el envío en USD
    const totalCostUSD = product.aliExpressPrice + product.shipping;
    let totalCostARS: number;
    if (product.puertaAPuerta) {
      // Régimen Puerta a Puerta: aplica impuesto especial si supera USD 50
      let impuestoPuertaAPuerta = 0;
      if (totalCostUSD > 50) {
        impuestoPuertaAPuerta = (totalCostUSD - 50) * 0.5;
      }
      const totalUSDConImpuesto = totalCostUSD + impuestoPuertaAPuerta;
      totalCostARS = totalUSDConImpuesto * DOLAR_ESTIMADO + COSTO_CORREO;
    } else {
      // Régimen tradicional: aplica todos los impuestos
      const subtotalARS = totalCostUSD * DOLAR_ESTIMADO;
      const iva = subtotalARS * IVA;
      const pais = subtotalARS * PAIS;
      const afip = subtotalARS * AFIP;
      const bbpp = subtotalARS * BBPP;
      totalCostARS = subtotalARS + iva + pais + afip + bbpp + COSTO_CORREO;
    }

    // Usar markup si está presente, si no, precio manual, si no, sugerido
    let salePriceARS: number;
    if (product.markup && product.markup > 0) {
      salePriceARS = totalCostARS * (1 + product.markup / 100);
    } else if (product.salePriceARS && product.salePriceARS > 0) {
      salePriceARS = product.salePriceARS;
    } else {
      salePriceARS = totalCostARS + GANANCIA_MINIMA;
    }

    // Calcula comisiones
    const mlCommission = salePriceARS * COMISION_ML;
    const mpCommission = salePriceARS * COMISION_MP;

    // Precio final menos comisiones
    const finalPriceARS = salePriceARS - mlCommission - mpCommission;

    // Ganancia real
    const profitARS = finalPriceARS - totalCostARS;

    // ¿Cumple ganancia mínima?
    const meetsMinProfit = profitARS >= GANANCIA_MINIMA;

    // Devuelve el producto con todos los campos calculados
    return {
      ...product,
      totalCostUSD,
      totalCostARS,
      salePriceARS,
      mlCommission,
      mpCommission,
      finalPriceARS,
      profitARS,
      meetsMinProfit
    };
  }
}