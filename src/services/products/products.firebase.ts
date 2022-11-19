import { productsCollection } from "../../db/firebase";

export class ProductServices {
  collection: typeof productsCollection;

  constructor(collection: typeof productsCollection) {
    this.collection = collection;
  }

  async getAll() {
    try {
      const response = await this.collection.get();
      const docs = response.docs;
      const products = docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        description: doc.data().description,
        price: doc.data().price,
        imageUrl: doc.data().imageUrl,
        code: doc.data().code,
        stock: doc.data().stock,
      }));

      return products;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async getById(id: string) {
    try {
      const response = this.collection.doc(id);
      const doc = await response.get();
      const product = {
        id: doc.id,
        ...doc.data(),
      };

      return product;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async save(input: {}) {
    try {
      const product = this.collection.doc();
      await product.create(input);

      return product;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async updateById(id: string, input: {}) {
    try {
      const response = this.collection.doc(id);
      const product = await response.update(input);

      return product;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async deleteById(id: string) {
    try {
      const response = this.collection.doc(id);
      const product = await response.delete();

      return product;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

export const ProductServicesFirebase = new ProductServices(productsCollection);
