import { Component } from '@angular/core';

@Component({
  selector: 'app-contacto',
  standalone: true,
  template: `
    <div class="contacto-container">
      <h2>Contacto</h2>
      <p>Puedes contactarnos a <a href="mailto:info&#64;importapro.com">info&#64;importapro.com</a></p>
    </div>
  `
})
export class ContactoComponent {} 