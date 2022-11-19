import { cartCollection } from "../../db/firebase";

export class CartServices {
  collection: typeof cartCollection;

  constructor(collection: typeof cartCollection) {
    this.collection = collection;
  }

  async getAll() {
    try {
      const response = await this.collection.get();
      const docs = response.docs;
      const carts = docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        description: doc.data().description,
        price: doc.data().price,
        imageUrl: doc.data().imageUrl,
        code: doc.data().code,
        stock: doc.data().stock,
      }));

      return carts;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async getCartById(id: string) {
    try {
      const response = this.collection.doc(id);
      const doc = await response.get();
      const cart = {
        id: doc.id,
        ...doc.data(),
      };

      return cart;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async create(input: {}) {
    try {
      const cart = this.collection.doc();
      await cart.create(input);

      return cart;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async addProductById(id: string, input: {}) {
    try {
      const cart = this.collection.doc(id);
      await cart.update(input);

      return cart;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async deleteCartById(id: string) {
    try {
      const response = this.collection.doc(id);
      const cart = await response.delete();

      return cart;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

export const CartServicesFirebase = new CartServices(cartCollection);
