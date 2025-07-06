import { Component, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss'
})
export class ProductFormComponent {
  @Output() addProduct = new EventEmitter<any>();
  productForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      aliExpressPrice: [0, Validators.required],
      shipping: [0, Validators.required],
      seller: ['']
      // Puedes agregar más campos aquí
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.addProduct.emit(this.productForm.value);
      this.productForm.reset();
    }
  }
}
