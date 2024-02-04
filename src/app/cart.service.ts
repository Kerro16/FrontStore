import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:8080/api/cart';

  private cartItems = new BehaviorSubject<any[]>([]);
  currentCartItems = this.cartItems.asObservable();

  constructor() { }

  addToCart(item: any): void {
    const currentItems = this.cartItems.value;
    this.cartItems.next([...currentItems, item]);
  }
  
clearCart(): void {
  this.cartItems.next([]);
}

}
