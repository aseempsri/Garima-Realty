import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './whatsapp-button.component.html',
  styleUrls: ['./whatsapp-button.component.css']
})
export class WhatsAppButtonComponent {
  whatsappUrl = 'https://wa.me/919011066839?text=Hi%2C%20I%27m%20interested%20in%20Garima%20Realty%20properties';
}
