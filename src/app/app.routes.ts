import { Routes } from '@angular/router';
import { ProductFormComponent } from './product-form/product-form';
import { ProductTable } from './product-table/product-table';
import { StatsComponent } from './stats/stats';
import { ContactoComponent } from './contacto/contacto';

export const routes: Routes = [
  { path: '', component: ProductFormComponent },
  { path: 'productos', component: ProductTable },
  { path: 'estadisticas', component: StatsComponent },
  { path: 'contacto', component: ContactoComponent }
];