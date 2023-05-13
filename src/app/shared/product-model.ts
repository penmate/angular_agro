import { ImagePayload } from "../image/image.payload";
import { AmountType } from "./model/AmountType";
import { Availability } from "./model/Availability";
import { ProductCondition } from "./model/ProductCondition";

export interface ProductModel {
    id: number;
    productName: string;
    description: string;
    userName: string;
    commentCount: number;
    duration: string;
    location: string;
    price: number;
    discountPrice: number;
    productCondition: ProductCondition,
    amount: number,
    amountType: AmountType,
    availability: Availability,
    productImages: ImagePayload[]

}