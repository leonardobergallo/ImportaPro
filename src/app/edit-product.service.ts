/*
============================================
EditProductService (Servicio global de edición)
============================================
- Permite guardar y compartir el producto a editar y su índice entre componentes y rutas.
- Usa signals para reactividad y simplicidad.
- Se inyecta en los componentes que necesitan leer o modificar el producto a editar.
*/
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EditProductService {
  // Signal reactivo para el producto a editar (null si no hay ninguno)
  productToEdit = signal<any | null>(null);
  // Signal para el índice del producto a editar (null si no hay ninguno)
  editIndex = signal<number | null>(null);

  // Guarda el producto y el índice a editar
  setEditProduct(product: any, index: number) {
    this.productToEdit.set(product);
    this.editIndex.set(index);
  }

  // Limpia el producto a editar
  clear() {
    this.productToEdit.set(null);
    this.editIndex.set(null);
  }
} 