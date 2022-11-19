import mongoose from "mongoose";
import { ProductDocument } from "./product.model";

export interface CartDocument extends mongoose.Document {
  product: ProductDocument["_id"];
}

const cartSchema = new mongoose.Schema(
  {
    product: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

const CartModel = mongoose.model<CartDocument>("Cart", cartSchema);

export default CartModel;
