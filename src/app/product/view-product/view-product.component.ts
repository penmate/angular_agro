import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { CommentPayload } from 'src/app/comment/comment.payload';
import { CommentService } from 'src/app/comment/comment.service';
import { ImagePayload } from 'src/app/image/image.payload';
import { ImageService } from 'src/app/image/image.service';
import { ProductModel } from 'src/app/shared/product-model';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  productId: number;
  product?: ProductModel;
  commentForm: FormGroup;
  commentPayload: CommentPayload;
  comments?: CommentPayload[];
  images?: ImagePayload[];

  constructor(private productService: ProductService, private activateRoute: ActivatedRoute,
    private commentService: CommentService, private imageService: ImageService, private sanitizer: DomSanitizer, private router: Router) {
    this.productId = this.activateRoute.snapshot.params['id'];

    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required)
    });
    this.commentPayload = {
      text: '',
      productId: this.productId
    };
  }

  ngOnInit(): void {
    this.getproductById();
    this.getCommentsForproduct();
    this.getImagesForproduct();
  }

  postComment() {
    this.commentPayload.text = this.commentForm.get('text')?.value;
    this.commentService.postComment(this.commentPayload).subscribe(data => {
      this.commentForm.get('text')?.setValue('');
      this.getCommentsForproduct();
    }, error => {
      throwError(error);
    })
  }

  private getproductById() {
    this.productService.getProductById(this.productId).subscribe(data => {
      this.product = data;
      console.log(this.product.productImages)
    }, error => {
      throwError(error);
      this.router.navigateByUrl('/not-found');
    });
  }

  private getCommentsForproduct() {
    this.commentService.getAllCommentsForProduct(this.productId).subscribe(data => {
      this.comments = data;
    }, error => {
      throwError(error);
    });
  }

  private getImagesForproduct() {
    this.imageService.getAllImagesForProduct(this.productId).subscribe(data => {
  
    this.images = this.imageService.createImages(data);
    }, error => {
      throwError(error);
    });
  }

}
