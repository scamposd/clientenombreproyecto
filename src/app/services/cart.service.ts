import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StatusData } from '../interfaces/status-data';
import { Observable } from 'rxjs';
import { urlproducto } from '../config/url';
import { urlpedido } from '../config/url';
import { map } from 'rxjs/operators';
import { Producto } from '../interfaces/producto';
import { Pedidos } from '../interfaces/pedidos';

export interface Product {
  id: number;
  name: string;
  price: number;
  amount: number;
  descripcion: string;
}
@Injectable({
  providedIn: 'root'
})
export class CartService {
  //data: Product[] = [

  // pk_idproducto nombre descripcion precio
  //  { id: 0, name: 'Pizza Salami',descripcion:'Queso Mozarella, Camaron', price: 8.99, amount: 0 },
  //  { id: 1, name: 'Pizza Classic',descripcion:'Queso ,Carne , Camaron', price: 5.49, amount: 0 },
  //  { id: 2, name: 'Sliced Bread',descripcion:'Pollo, Mozarella, Camaron', price: 4.99, amount: 0 },
  //  { id: 3, name: 'Chorrillana',descripcion:'Papas, Huevo, Cebolla, Queso Mozarella, Camaron', price: 6.99, amount: 0 },
  //  { id: 4, name: 'Sushi',descripcion:'Queso Mozarella, Camaron', price: 10.99, amount: 0 },
  //  { id: 5, name: 'Vino',descripcion:'Queso Mozarella, Camaron', price: 11.99, amount: 0 },
  //  { id: 6, name: 'Cerveza',descripcion:'Queso Mozarella, Camaron', price: 12.99, amount: 0 },
  //  { id: 7, name: 'Tabla',descripcion:'Queso Mozarella, Camaron', price: 15.99, amount: 0 },
  //  { id: 8, name: 'Papas Rancheras',descripcion:'Queso Mozarella, Camaron', price: 5.00, amount: 0 }
  //];

  private cart = [];
  private cartItemCount = new BehaviorSubject(0);
  url: string = urlproducto;
  data: Producto[] = [];


  headers: HttpHeaders = new HttpHeaders({
    'Content-type': 'application/json'
  });

  constructor(private http: HttpClient) { }


  obtenerProductos(idEmpresa: number): Observable<any> {
    const url2 = this.url + '/producto/' + idEmpresa;
    //console.log(formato)
    console.log('obtenerProductosantes de return');
    return this.http.get<StatusData>(url2, { headers: this.headers })
      .pipe(map(data => {
        //this.persona = data.data;
        //console.log('dataService', data[0].fk_idcolaborador);
        //console.log('dataService', data[0].fk_idempresa);

        if (data.codigo === "000") {
          this.data = data.data;
          console.log('obtenerProductos', this.data);
        }
        else {
          //return false;
          console.log('error');
        }
        return data;
      }
      ));

  }

  solicitarComanda(pedido: Pedidos): Observable<any> {
    //let token = this.loginService.getToken();
    //console.log('jsonFormatoulecturas', jsonFormato);
    console.log('pedido', pedido);
    const url2 = urlpedido + '/pedido/';
    return this.http.post<StatusData>(url2, pedido, { headers: this.headers });

  }

  getProducts() {
    return this.data;
  }

  getCart() {
    console.log("getCart", this.cart);
    return this.cart;
  }

  getCartItemCount() {
    return this.cartItemCount;
  }

  addProduct(product) {
    let added = false;
    for (let p of this.cart) {
      if (p.pk_idproducto === product.pk_idproducto) {
        p.amount += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      product.amount = 1;
      this.cart.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }

  decreaseProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.pk_idproducto === product.pk_idproducto) {
        p.amount -= 1;
        if (p.amount == 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }

  removeProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.pk_idproducto === product.pk_idproducto) {
        this.cartItemCount.next(this.cartItemCount.value - p.amount);
        this.cart.splice(index, 1);
      }
    }
  }


}