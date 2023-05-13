import { AmountType } from "./AmountType";
import { Availability } from "./Availability";
import { ProductCondition } from "./ProductCondition";

export interface ProductUpdateRequest {
    productName: string;
    description: string;
    location: string;
    price: number;
    discountPrice: number;
    productCondition: ProductCondition,
    amount: number,
    amountType: AmountType,
    availability: Availability,
    productImages: []
}