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
    return this.http.get<Array<ProductModel>>('http://localhost:8080/api/products/');
  }

  createProduct(productPayload: CreateProductPayload): Observable<any> {
    console.log(productPayload);
    return this.http.post('http://localhost:8080/api/products/', productPayload);
  }

  getProduct(id: number): Observable<ProductModel> {
    return this.http.get<ProductModel>('http://localhost:8080/api/products/' + id);
  }

  getAllProductsByUser(name: string): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>('http://localhost:8080/api/products/by-user/' + name);
  }
}
