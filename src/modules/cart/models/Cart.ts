import { IProduct } from "../../products/models/IProduct";

export default class Cart {
    items: Item[];
    amount: number;

    constructor(items: Item[] = []) {
        this.items = items;
        this.amount = this.calculateAmount();
    }

    addItem(item: Item): void {
        this.items.push(item);
        this.amount = this.calculateAmount();
    }

    removeItem(productId: string): void {
        this.items = this.items.filter((i) => i.product.id !== productId);
        this.amount = this.calculateAmount();
    }

    calculateAmount(): number {
        return this.items.reduce((total, item) => {
            const a = total + item.product.price * item.quantity;
            console.log("Total: " + a);
            return a;
        }, 0);
    }
}

export class Item {
    id?: number;
    quantity: number;
    product: IProduct;
    subtotal: number;

    constructor(quantity: number, product: IProduct) {
        this.quantity = quantity;
        this.product = product;
        this.subtotal = this.calculateSubtotal();
    }

    calculateSubtotal(): number {
        console.log("Subtotal: " + this.product.price * this.quantity);
        return this.product.price * this.quantity;
    }
}
