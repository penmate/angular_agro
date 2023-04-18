import { ImagePayload } from "../../image/image.payload";
import { Availability } from "../../shared/model/Availability";
import { AmountType } from "../../shared/model/AmountType";
import { ProductCondition } from "../../shared/model/ProductCondition";

export interface CreateProductPayload {
    name: string;
    description: string;
    price: number;
	discountPrice: number;
	location: string;
	productCondition: ProductCondition;
    amount: number;
    amountType: AmountType;
    availability: Availability;
    productImages: ImagePayload[];
}