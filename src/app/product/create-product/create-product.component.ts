import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { ProductService } from 'src/app/shared/product.service';
import { CreateProductPayload } from './create-product.payload';
import { ImagePayload } from '../../image/image.payload';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  createProductForm: FormGroup;
  productPayload: CreateProductPayload;

  constructor(private sanitizer: DomSanitizer, private router: Router, private productService: ProductService) {
    this.productPayload = {
      name: '',
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

    this.createProductForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      productCondition: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      amountType: new FormControl('', Validators.required)
    });
  }

  ngOnInit() { }

  createProduct() {
    this.productPayload.name = this.createProductForm.get('name')?.value;
    this.productPayload.description = this.createProductForm.get('description')?.value;
    this.productPayload.price = this.createProductForm.get('price')?.value;
    this.productPayload.discountPrice = this.createProductForm.get('price')?.value;
    this.productPayload.location = this.createProductForm.get('location')?.value;
    this.productPayload.productCondition = this.createProductForm.get('productCondition')?.value;
    this.productPayload.amount = this.createProductForm.get('amount')?.value;
    this.productPayload.amountType = this.createProductForm.get('amountType')?.value;

    var productFormData = this.prepareFormData(this.productPayload)
    this.productService.createProduct(productFormData).subscribe((data) => {
      this.router.navigateByUrl('/');
    }, error => {
      throwError(error);
    })
  }

  prepareFormData(productPayload: CreateProductPayload): FormData {
    const formData = new FormData();
    formData.append(
      'productRequest',
      new Blob([JSON.stringify(productPayload)], {type: 'application/json'})
    );

    for(var i = 0; i< productPayload.productImages.length; i++) {
      formData.append(
        'imageRequest',
        productPayload.productImages[i].file,
        productPayload.productImages[i].file.name
      );
    }
    return formData;
  }

  discardProduct() {
    this.router.navigateByUrl('/');
  }

  removeImage(i: number) {
    this.productPayload.productImages.splice(i, 1);
  }

  onImageSelected(event: any) {
    if(event.target.files) {
      const file = event.target.files[0];
      const imagePayload: ImagePayload = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }
      this.productPayload.productImages.push(imagePayload);
    }
    console.log(event);
  }

  fileDropped(imagePayload: ImagePayload) {
    this.productPayload.productImages.push(imagePayload);
  }
}
