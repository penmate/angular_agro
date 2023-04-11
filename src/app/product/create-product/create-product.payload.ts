import { ImagePayload } from "./image.payload";

export interface CreateProductPayload {
    name: string;
    description: string;
    productImages: ImagePayload[];
}