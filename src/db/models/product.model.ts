import mongoose from "mongoose";

export interface Product {
  title: string;
  price: number;
  imageUrl: string;
  description: string;
  code: string;
  stock: number;
}

export interface ProductDocument extends mongoose.Document {}

const productSchema = new mongoose.Schema(
  {
    title: { type: String },
    price: { type: Number },
    imageUrl: { type: String },
    description: { type: String },
    code: { type: String },
    stock: { type: Number },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model<ProductDocument>("Product", productSchema);

export default ProductModel;
