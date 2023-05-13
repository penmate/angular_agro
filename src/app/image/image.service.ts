import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ImagePayload } from './image.payload';
import { Observable } from 'rxjs';
import { CreateProductPayload } from '../product/create-product/create-product.payload';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageResponse } from './image-response';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer) { }

  getAllImagesForProduct(productId: number): Observable<ImageResponse[]> {
    return this.httpClient.get<ImageResponse[]>('http://localhost:8080/api/images/by_product/' + productId);
  }

  public createImages(imageResponses: ImageResponse[]) {

    const productImages: any[] = imageResponses;

    const imagePayloads: ImagePayload[] = [];
    
    for (let i = 0; i < productImages.length; i++) {
      const imageData = productImages[i];

      const imageBlob = this.dataURItoBlob(imageData.picByte, imageData.type);

      const imageFile = new File([imageBlob], imageData.name, {type: imageData.type});

      const imagePayload: ImagePayload = {
        file: imageFile,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(imageFile))
      }

      imagePayloads.push(imagePayload);
    }
    return imagePayloads;
  }

  public dataURItoBlob(picBytes: any, imageType: any) {
    const byteString = window.atob(picBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([int8Array], {type: imageType});
    return blob;

  }

}
