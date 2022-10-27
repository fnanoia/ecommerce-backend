import express from "express";
import { deleteProductById, getProductById, getProducts, saveProduct, updateProductById } from "../controllers/products";
import { verifyRole } from "../middlewares/role";

const productsRouter = express.Router();

//get all products
productsRouter.get("/", verifyRole, getProducts);

//get product by id
productsRouter.get("/:id", getProductById);

//save new product
productsRouter.post("/", verifyRole, saveProduct);

//update product by id
productsRouter.put("/:id", verifyRole, updateProductById);

//delete product by id
productsRouter.delete("/:id", verifyRole, deleteProductById);

export default productsRouter;
