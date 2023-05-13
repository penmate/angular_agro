import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from './product-model';
import { CreateProductPayload } from '../product/create-product/create-product.payload';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts(searchKey: string = ""): Observable<Array<ProductModel>> {
    // console.log("Log from getAllProducts productService" + (new Error()).stack)
    return this.http.get<Array<ProductModel>>('http://localhost:8080/api/products?searchKey=' + searchKey);
  }

  createProduct(productPayload: FormData): Observable<any> {
    // console.log("Log from createProduct productService" + (new Error()).stack)
    return this.http.post('http://localhost:8080/api/products/', productPayload);
  }

  getProductById(id: number): Observable<ProductModel> {
    return this.http.get<ProductModel>('http://localhost:8080/api/products/' + id);
  }

  getAllProductsByUser(name: string): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>('http://localhost:8080/api/products/by_user/' + name);
  }

  deleteProductById(id: number): Observable<any> {
    return this.http.delete('http://localhost:8080/api/products/' + id);
  }
}
