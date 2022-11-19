import ProductModel from "../../db/models/product.model";

export class ProductServices {
  model: typeof ProductModel;

  constructor(model: typeof ProductModel) {
    this.model = model;
  }

  async getAll() {
    try {
      const products = await this.model.find();

      return products;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async getById(id: string) {
    try {
      const product = await this.model.findOne({ id });

      return product;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async save(input: {}) {
    try {
      const product = await this.model.create(input);

      return product;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async updateById(id: string, input: {}) {
    try {
      const product = await this.model.findOneAndUpdate({ id }, input);

      return product;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async deleteById(id: string) {
    try {
      const product = await this.model.findOneAndDelete({ id });

      return product;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

export const ProductServicesMongo = new ProductServices(ProductModel);
