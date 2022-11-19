import CartModel from "../../db/models/cart.model";

export class CartServices {
  model: typeof CartModel;

  constructor(model: typeof CartModel) {
    this.model = model;
  }

  async getAll() {
    try {
      const carts = await this.model.find();

      return carts;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async getCartById(id: string) {
    try {
      const cart = await this.model.find({ id });

      return cart;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async create(input: {}) {
    try {
      const cart = await this.model.create(input);

      return cart;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async addProductById(id: string, input: {}) {
    try {
      const cart = await this.model.findOne({ id });

      cart?.product.push(input);

      return cart;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async deleteCartById(id: string) {
    try {
      const cart = await this.model.deleteOne({ id });

      return cart;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  //debug
  async deleteProductById(idCart: string, idProd: string) {
    try {
      const cart = await this.model.findOne({ idCart });

      const prod = cart.product;

      prod.deleteOne({ idProd });

      return cart;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

export const CartServicesMongo = new CartServices(CartModel);
