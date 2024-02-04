import { Component} from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ProductDetailService } from '../service/product-detail.service';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  productId: number = 0;
  productDetails: any;


  constructor(private route: ActivatedRoute, private productdetailService: ProductDetailService, private cartService: CartService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const productIdParam = params.get('id');
  
      if (productIdParam) {
        this.productId = +productIdParam;
        this.getProductDetails();
      } else {
        console.error("El parámetro 'id' no está presente en la URL");
      }
    });
  }

  getProductDetails(): void {
    this.productdetailService.getProductDetails(this.productId).subscribe((details) => {
      this.productDetails = details;
    });
  }


  addToCart(): void {
    if (this.productDetails) {
      this.cartService.addToCart(this.productDetails);
      console.log('Producto añadido al carrito:', this.productDetails);
    }
  }
}