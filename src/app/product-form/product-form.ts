/*
============================================
ProductFormComponent (Formulario de Alta/Edición)
============================================
- Permite crear y editar productos.
- Recibe por @Input el producto a editar y el índice.
- Si recibe un producto, llena el formulario para edición.
- Al enviar, emite el producto (nuevo o editado) por @Output.
- Permite ingresar precio de venta manual o calcularlo automáticamente con un % de ganancia (markup).
- Si se ingresa markup, el campo de precio de venta manual se deshabilita.
- En Angular, los formularios reactivos permiten lógica condicional y validaciones robustas.
- En React, usarías useState/useReducer y props/callbacks para manejar formularios y edición.
- TypeScript ayuda a tipar los datos y evitar errores.
*/

import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core'; // Decoradores y utilidades Angular
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Para formularios reactivos
import { CommonModule } from '@angular/common';
import { ProductStoreService, Product } from '../product-store.service';
import { ProductCalculatorService } from '../product-calculator';
import { EditProductService } from '../edit-product.service'; // Servicio de edición

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss'
})
export class ProductFormComponent implements OnChanges, OnInit {
  // Recibe el producto a editar y el índice desde el componente principal
  @Input() productToEdit: any = null;
  @Input() editIndex: number | null = null;
  // Emite el producto nuevo o editado al componente principal
  @Output() addOrUpdateProduct = new EventEmitter<any>();

  // Formulario reactivo: define los campos y validaciones
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productStore: ProductStoreService,
    private calculator: ProductCalculatorService,
    private editService: EditProductService // Servicio de edición
  ) {
    // Inicializa el formulario con los campos necesarios
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      aliExpressPrice: [0, Validators.required],
      shipping: [0, Validators.required],
      seller: [''],
      category: [''],
      puertaAPuerta: [false],
      salePriceARS: [''],
      markup: [''] // Campo para % de ganancia
    });
  }

  // Se ejecuta cuando se inicializa el componente
  ngOnInit() {
    // Verifica si hay un producto para editar en el servicio
    const productToEdit = this.editService.productToEdit();
    const editIndex = this.editService.editIndex();
    
    if (productToEdit && editIndex !== null) {
      // Llena el formulario con los datos del producto a editar
      this.productForm.patchValue({
        ...productToEdit,
        salePriceARS: productToEdit.salePriceARS ?? '',
        markup: productToEdit.markup ?? ''
      });
      // Limpia el servicio después de usarlo
      this.editService.clear();
    }
  }

  // Se ejecuta cuando cambian los @Input (por ejemplo, al editar)
  ngOnChanges(changes: SimpleChanges) {
    if (changes['productToEdit'] && this.productToEdit) {
      // Llena el formulario con los datos del producto a editar
      this.productForm.patchValue({
        ...this.productToEdit,
        salePriceARS: this.productToEdit.salePriceARS ?? '',
        markup: this.productToEdit.markup ?? ''
      });
    }
  }

  // Handler para el submit del formulario
  onSubmit() {
    if (this.productForm.valid) {
      // Prepara el producto a partir de los valores del formulario
      const formValue = this.productForm.value;
      const rawProduct = {
        name: formValue.name || '',
        aliExpressPrice: Number(formValue.aliExpressPrice) || 0,
        shipping: Number(formValue.shipping) || 0,
        seller: formValue.seller || '',
        category: formValue.category || '',
        puertaAPuerta: !!formValue.puertaAPuerta,
        salePriceARS: formValue.salePriceARS ? Number(formValue.salePriceARS) : undefined,
        markup: formValue.markup ? Number(formValue.markup) : undefined
      };
      
      // Usa el servicio global para agregar el producto
      this.productStore.addOrUpdateProduct(rawProduct);
      
      // Resetea el formulario para el próximo uso
      this.productForm.reset();
    }
  }
}
