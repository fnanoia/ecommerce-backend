import express from "express";
import { deleteProductById, getProductById, getProducts, saveProduct, updateProductById } from "../controllers/products";

const productsRouter = express.Router();

//get all products
productsRouter.get("/", getProducts);

//get product by id
productsRouter.get("/:id", getProductById);

//save new product
productsRouter.post("/", saveProduct);

//update product by id
productsRouter.put("/:id", updateProductById);

//delete product by id
productsRouter.delete("/:id", deleteProductById);

export default productsRouter;
