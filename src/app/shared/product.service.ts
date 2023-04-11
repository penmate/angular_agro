import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from './product-model';
import { CreateProductPayload } from '../product/create-product/create-product.payload';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Array<ProductModel>> {
    console.log("Log from getAllProducts productService" + (new Error()).stack)
    return this.http.get<Array<ProductModel>>('http://localhost:8080/api/products/');
  }

  createProduct(productPayload: FormData): Observable<any> {
    console.log("Log from createProduct productService" + (new Error()).stack)
    return this.http.post('http://localhost:8080/api/products/', productPayload);
  }

  getProduct(id: number): Observable<ProductModel> {
    return this.http.get<ProductModel>('http://localhost:8080/api/products/' + id);
  }

  getAllProductsByUser(name: string): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>('http://localhost:8080/api/products/by_user/' + name);
  }
}
