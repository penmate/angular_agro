import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { ProductService } from 'src/app/shared/product.service';
import { CreateProductPayload } from './create-product.payload';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  createProductForm: FormGroup;
  productPayload: CreateProductPayload;

  constructor(private router: Router, private productService: ProductService) {
    this.productPayload = {
      name: '',
      description: '',
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

    this.productService.createProduct(this.productPayload).subscribe((data) => {
      console.log("Log from CreateProductComponent");
      console.log(data);
      this.router.navigateByUrl('/');
    }, error => {
      throwError(error);
    })
  }

  discardProduct() {
    this.router.navigateByUrl('/');
  }

}
