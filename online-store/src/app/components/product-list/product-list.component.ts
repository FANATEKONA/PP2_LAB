import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products: Product[] = [
    {
      "id": 1,
      "name": "Apple iPhone 15 Pro 128Gb",
      "description": "Флагманский смартфон с прочным титановым корпусом и инновационным чипом A17 Pro. Оснащен передовой системой камер с основным модулем на 48 Мп для профессиональной съемки.",
      "price": 555000,
      "rating": 4.9,
      "image": "https://resources.cdn-kaspi.kz/img/m/p/h32/h70/84378448199710.jpg",
      "images": [
        "https://resources.cdn-kaspi.kz/img/m/p/h32/h70/84378448199710.jpg",
        "https://p.turbosquid.com/ts-thumb/rY/AE03O2/Bq/3/jpg/1694869517/1920x1080/fit_q87/40c180a372f7a56c161df8927043999223b28c22/3.jpg",
        "https://p.turbosquid.com/ts-thumb/rY/AE03O2/Bq/3/jpg/1694869517/1920x1080/fit_q87/40c180a372f7a56c161df8927043999223b28c22/3.jpg"
      ],
      "link": "https://kaspi.kz/shop/p/apple-iphone-15-pro-128gb-dual-sim-sinii-114532551/"
    },
    {
      "id": 2,
      "name": "Apple iPhone 15 Pro 128Gb",
      "description": "Флагманский смартфон с прочным титановым корпусом и инновационным чипом A17 Pro. Оснащен передовой системой камер с основным модулем на 48 Мп для профессиональной съемки.",
      "price": 555000,
      "rating": 4.9,
      "image": "https://resources.cdn-kaspi.kz/img/m/p/h32/h70/84378448199710.jpg",
      "images": [
        "https://resources.cdn-kaspi.kz/img/m/p/h32/h70/84378448199710.jpg",
        "https://p.turbosquid.com/ts-thumb/rY/AE03O2/Bq/3/jpg/1694869517/1920x1080/fit_q87/40c180a372f7a56c161df8927043999223b28c22/3.jpg",
        "https://p.turbosquid.com/ts-thumb/rY/AE03O2/Bq/3/jpg/1694869517/1920x1080/fit_q87/40c180a372f7a56c161df8927043999223b28c22/3.jpg"
      ],
      "link": "https://kaspi.kz/shop/p/apple-iphone-15-pro-128gb-dual-sim-sinii-114532551/"
    },
    {
      "id": 3,
      "name": "Apple iPhone 15 Pro 128Gb",
      "description": "Флагманский смартфон с прочным титановым корпусом и инновационным чипом A17 Pro. Оснащен передовой системой камер с основным модулем на 48 Мп для профессиональной съемки.",
      "price": 555000,
      "rating": 4.9,
      "image": "https://resources.cdn-kaspi.kz/img/m/p/h32/h70/84378448199710.jpg",
      "images": [
        "https://resources.cdn-kaspi.kz/img/m/p/h32/h70/84378448199710.jpg",
        "https://p.turbosquid.com/ts-thumb/rY/AE03O2/Bq/3/jpg/1694869517/1920x1080/fit_q87/40c180a372f7a56c161df8927043999223b28c22/3.jpg",
        "https://p.turbosquid.com/ts-thumb/rY/AE03O2/Bq/3/jpg/1694869517/1920x1080/fit_q87/40c180a372f7a56c161df8927043999223b28c22/3.jpg"
      ],
      "link": "https://kaspi.kz/shop/p/apple-iphone-15-pro-128gb-dual-sim-sinii-114532551/"
    },
    {
      "id": 4,
      "name": "Apple iPhone 15 Pro 128Gb",
      "description": "Флагманский смартфон с прочным титановым корпусом и инновационным чипом A17 Pro. Оснащен передовой системой камер с основным модулем на 48 Мп для профессиональной съемки.",
      "price": 555000,
      "rating": 4.9,
      "image": "https://resources.cdn-kaspi.kz/img/m/p/h32/h70/84378448199710.jpg",
      "images": [
        "https://resources.cdn-kaspi.kz/img/m/p/h32/h70/84378448199710.jpg",
        "https://p.turbosquid.com/ts-thumb/rY/AE03O2/Bq/3/jpg/1694869517/1920x1080/fit_q87/40c180a372f7a56c161df8927043999223b28c22/3.jpg",
        "https://p.turbosquid.com/ts-thumb/rY/AE03O2/Bq/3/jpg/1694869517/1920x1080/fit_q87/40c180a372f7a56c161df8927043999223b28c22/3.jpg"
      ],
      "link": "https://kaspi.kz/shop/p/apple-iphone-15-pro-128gb-dual-sim-sinii-114532551/"
    },
    {
      "id": 5,
      "name": "Apple iPhone 15 Pro 128Gb",
      "description": "Флагманский смартфон с прочным титановым корпусом и инновационным чипом A17 Pro. Оснащен передовой системой камер с основным модулем на 48 Мп для профессиональной съемки.",
      "price": 555000,
      "rating": 4.9,
      "image": "https://resources.cdn-kaspi.kz/img/m/p/h32/h70/84378448199710.jpg",
      "images": [
        "https://resources.cdn-kaspi.kz/img/m/p/h32/h70/84378448199710.jpg",
        "https://p.turbosquid.com/ts-thumb/rY/AE03O2/Bq/3/jpg/1694869517/1920x1080/fit_q87/40c180a372f7a56c161df8927043999223b28c22/3.jpg",
        "https://p.turbosquid.com/ts-thumb/rY/AE03O2/Bq/3/jpg/1694869517/1920x1080/fit_q87/40c180a372f7a56c161df8927043999223b28c22/3.jpg"
      ],
      "link": "https://kaspi.kz/shop/p/apple-iphone-15-pro-128gb-dual-sim-sinii-114532551/"
    },
    {
      "id": 6,
      "name": "Apple iPhone 15 Pro 128Gb",
      "description": "Флагманский смартфон с прочным титановым корпусом и инновационным чипом A17 Pro. Оснащен передовой системой камер с основным модулем на 48 Мп для профессиональной съемки.",
      "price": 555000,
      "rating": 4.9,
      "image": "https://resources.cdn-kaspi.kz/img/m/p/h32/h70/84378448199710.jpg",
      "images": [
        "https://resources.cdn-kaspi.kz/img/m/p/h32/h70/84378448199710.jpg",
        "https://p.turbosquid.com/ts-thumb/rY/AE03O2/Bq/3/jpg/1694869517/1920x1080/fit_q87/40c180a372f7a56c161df8927043999223b28c22/3.jpg",
        "https://p.turbosquid.com/ts-thumb/rY/AE03O2/Bq/3/jpg/1694869517/1920x1080/fit_q87/40c180a372f7a56c161df8927043999223b28c22/3.jpg"
      ],
      "link": "https://kaspi.kz/shop/p/apple-iphone-15-pro-128gb-dual-sim-sinii-114532551/"
    },
    {
      "id": 7,
      "name": "Apple iPhone 15 Pro 128Gb",
      "description": "Флагманский смартфон с прочным титановым корпусом и инновационным чипом A17 Pro. Оснащен передовой системой камер с основным модулем на 48 Мп для профессиональной съемки.",
      "price": 555000,
      "rating": 4.9,
      "image": "https://resources.cdn-kaspi.kz/img/m/p/h32/h70/84378448199710.jpg",
      "images": [
        "https://resources.cdn-kaspi.kz/img/m/p/h32/h70/84378448199710.jpg",
        "https://p.turbosquid.com/ts-thumb/rY/AE03O2/Bq/3/jpg/1694869517/1920x1080/fit_q87/40c180a372f7a56c161df8927043999223b28c22/3.jpg",
        "https://p.turbosquid.com/ts-thumb/rY/AE03O2/Bq/3/jpg/1694869517/1920x1080/fit_q87/40c180a372f7a56c161df8927043999223b28c22/3.jpg"
      ],
      "link": "https://kaspi.kz/shop/p/apple-iphone-15-pro-128gb-dual-sim-sinii-114532551/"
    },
    {
      "id": 8,
      "name": "Apple iPhone 15 Pro 128Gb",
      "description": "Флагманский смартфон с прочным титановым корпусом и инновационным чипом A17 Pro. Оснащен передовой системой камер с основным модулем на 48 Мп для профессиональной съемки.",
      "price": 555000,
      "rating": 4.9,
      "image": "https://resources.cdn-kaspi.kz/img/m/p/h32/h70/84378448199710.jpg",
      "images": [
        "https://resources.cdn-kaspi.kz/img/m/p/h32/h70/84378448199710.jpg",
        "https://p.turbosquid.com/ts-thumb/rY/AE03O2/Bq/3/jpg/1694869517/1920x1080/fit_q87/40c180a372f7a56c161df8927043999223b28c22/3.jpg",
        "https://p.turbosquid.com/ts-thumb/rY/AE03O2/Bq/3/jpg/1694869517/1920x1080/fit_q87/40c180a372f7a56c161df8927043999223b28c22/3.jpg"
      ],
      "link": "https://kaspi.kz/shop/p/apple-iphone-15-pro-128gb-dual-sim-sinii-114532551/"
    },
    {
      "id": 9,
      "name": "Apple iPhone 15 Pro 128Gb",
      "description": "Флагманский смартфон с прочным титановым корпусом и инновационным чипом A17 Pro. Оснащен передовой системой камер с основным модулем на 48 Мп для профессиональной съемки.",
      "price": 555000,
      "rating": 4.9,
      "image": "https://resources.cdn-kaspi.kz/img/m/p/h32/h70/84378448199710.jpg",
      "images": [
        "https://resources.cdn-kaspi.kz/img/m/p/h32/h70/84378448199710.jpg",
        "https://p.turbosquid.com/ts-thumb/rY/AE03O2/Bq/3/jpg/1694869517/1920x1080/fit_q87/40c180a372f7a56c161df8927043999223b28c22/3.jpg",
        "https://p.turbosquid.com/ts-thumb/rY/AE03O2/Bq/3/jpg/1694869517/1920x1080/fit_q87/40c180a372f7a56c161df8927043999223b28c22/3.jpg"
      ],
      "link": "https://kaspi.kz/shop/p/apple-iphone-15-pro-128gb-dual-sim-sinii-114532551/"
    },
    {
      "id": 10,
      "name": "Apple iPhone 15 Pro 128Gb",
      "description": "Флагманский смартфон с прочным титановым корпусом и инновационным чипом A17 Pro. Оснащен передовой системой камер с основным модулем на 48 Мп для профессиональной съемки.",
      "price": 555000,
      "rating": 4.9,
      "image": "https://resources.cdn-kaspi.kz/img/m/p/h32/h70/84378448199710.jpg",
      "images": [
        "https://resources.cdn-kaspi.kz/img/m/p/h32/h70/84378448199710.jpg",
        "https://p.turbosquid.com/ts-thumb/rY/AE03O2/Bq/3/jpg/1694869517/1920x1080/fit_q87/40c180a372f7a56c161df8927043999223b28c22/3.jpg",
        "https://p.turbosquid.com/ts-thumb/rY/AE03O2/Bq/3/jpg/1694869517/1920x1080/fit_q87/40c180a372f7a56c161df8927043999223b28c22/3.jpg"
      ],
      "link": "https://kaspi.kz/shop/p/apple-iphone-15-pro-128gb-dual-sim-sinii-114532551/"
    }
  ];
  }
