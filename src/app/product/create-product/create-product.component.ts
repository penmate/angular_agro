import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { ProductService } from 'src/app/shared/product.service';
import { CreateProductPayload } from './create-product.payload';
import { ImagePayload } from './image.payload';
import { DomSanitizer } from '@angular/platform-browser';
import { type } from 'os';

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
      productImages: []
    }

    this.createProductForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  ngOnInit() { }

  createProduct() {
    this.productPayload.name = this.createProductForm.get('name')?.value;
    this.productPayload.description = this.createProductForm.get('description')?.value;
    this.productService.createProduct(this.prepareFormData(this.productPayload)).subscribe((data) => {
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
}
