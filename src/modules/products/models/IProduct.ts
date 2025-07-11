import { IDimensions } from "./IDimensions";
import { IMeta } from "./IMeta";
import { IReview } from "./IReview";

export interface IProduct {
    id: string;
    title?: string;
    description?: string;
    category: string;
    price: number;
    discountPercentage?: number;
    rating?: number;
    stock?: number;
    tags?: string[];
    brand?: string;
    sku?: string;
    weight?: number;
    dimensions?: IDimensions;
    warrantyInformation?: string;
    shippingInformation?: string;
    availabilityStatus?: string;
    reviews?: IReview[];
    returnPolicy?: string;
    minimumOrderQuantity?: number;
    meta?: IMeta;
    images: string[];
    thumbnail?: string;
    ownerId?: string;
  }
