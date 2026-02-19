import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: Product;

  currentImageIndex: number = 0;

  get currentImage(): string {
    return this.product.images[this.currentImageIndex];
  }

  changeImage(index: number) {
    this.currentImageIndex = index;
  }

  shareOnWhatsapp() {
    const url = `https://wa.me/?text=${encodeURIComponent('Посмотри: ' + this.product.link)}`;
    window.open(url, '_blank');
  }

  shareOnTelegram() {
    const url = `https://t.me/share/url?url=${encodeURIComponent(this.product.link)}&text=${encodeURIComponent(this.product.name)}`;
    window.open(url, '_blank');
  }
}
