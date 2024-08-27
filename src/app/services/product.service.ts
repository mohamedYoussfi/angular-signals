import {effect, Injectable, signal} from '@angular/core';
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productsState = signal<Product[]>([]);
  constructor() {
    effect(() => {
      this.productsState.set(
        [
          {id : 1, name : "Computer", price : 6500, selected : false},
          {id : 2, name : "Printer", price : 1200, selected : true},
          {id : 3, name : "Smart phone", price : 3200, selected : true},
        ]
      )
    }, {allowSignalWrites : true});
  }
  public getAllProducts(){
    return this.productsState();
  }

  public selectProduct(product : Product){
    this.productsState.update(
      prods=> prods.map(
        p=>(p.id === product.id)
              ?{...product, selected
              : !product.selected}:p)

    )
  }

  deleteProduct(product: Product) {
    // Backend
    this.productsState.update(
      state=> state.filter(p=>p.id!==product.id)
    )
  }

  saveProduct(product: Product) {
    product.id = new Date().getTime();
    this.productsState.update(state=>[...state, product]);
  }
}
