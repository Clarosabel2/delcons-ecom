export interface IStore {
    id: string;
    name: string;
    description: string;
    address: string;
    phone: string;
    email: string;
    logo: string;
    banner: string;
    rating?: number;
    reviewsCount?: number;
    tags?: string[];
    socialMedia: {
        facebook: string;
        instagram: string;
        twitter: string;
        linkedin: string;
    };
    paymentMethods: string[];
    shippingMethods: string[];
    isOpen: boolean;
    openingHours: {
        monday: string;
        tuesday: string;
        wednesday: string;
        thursday: string;
        friday: string;
        saturday: string;
        sunday: string;
    };
}