import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent  implements OnInit{

products: any[] = [];

constructor(private productService: ProductService){}

users: any[] = [];
maxSize: number = 7;
totalItems: number = 0; 
p: number = 1;
itemsPerPage: number = 12;

ngOnInit(): void {
  this.loadProducts();
}

private loadProducts(): void {
  this.productService.getProducts().subscribe(
    (response) => {
      this.products = response;
    },
    (error) => {
      console.error('Error al obtener la lista de productos', error);
    }
  );
}

pageChanged(event: number): void {
  this.p = event;
  console.log(this.p);
}

}
