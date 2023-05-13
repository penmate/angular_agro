import { Injectable } from '@angular/core';
import { ProductModel } from './shared/product-model';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProductService } from './shared/product.service';
import { ProductUpdateRequest } from './shared/model/product-update.request';
import { ImageService } from './image/image.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolveService implements Resolve<ProductModel> {

  constructor(private productService: ProductService, private router: Router, private imageService: ImageService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductModel> | any | Promise<boolean> {
    const id = route.paramMap.get("productId");

    if(id) {
      return this.productService.getProductById(Number(id))
            .pipe(
              .map(p => )
            );
    } else {
      return this.router.navigateByUrl('/not-found');
    }
  }

  setEmptyProductDetails() {
    const productModel: ProductUpdateRequest = {
      productName: '',
      description: '',
      price: 0,
      discountPrice: 0,
      location: '',
      productCondition: 3,
      amount: 0,
      amountType: 0,
      availability: 0,
      productImages: []
    }
    return productModel;
  }
}
