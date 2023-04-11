import { ImagePayload } from "./image.payload";

export interface CreateProductPayload {
    name: string;
    description: string;
    price: number;
	discountPrice: number;
	location: string;
	quality: string;
    productImages: ImagePayload[];
}