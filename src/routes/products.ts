import express from "express";
import { getProductById, getProducts, saveProduct, updateProductById } from "../controllers/products";

const productsRouter = express.Router();

productsRouter.get("/", getProducts);

productsRouter.get("/:id", getProductById);

productsRouter.post("/", saveProduct);

productsRouter.put("/:id", updateProductById);

export default productsRouter;
