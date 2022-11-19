import express from "express";
import { addProductToCart, createCart, deleteCartById, deleteProductByIdFromCart, getAllCarts, getCartById } from "../controllers/cart.controller";


const cartRouter = express.Router();

//get all carts
cartRouter.get("/", getAllCarts);

//get cart by id
cartRouter.get("/:id", getCartById);

//create new cart
cartRouter.post("/", createCart);

//delete cart by id
cartRouter.delete("/:id", deleteCartById);

//get product by cart id
//cartRouter.get("/:id/products", getProductsByCartId);

//add product to cart
cartRouter.post("/:id/products", addProductToCart);

//delete product by id of cart by id
cartRouter.delete("/:id/products/:id_prod", deleteProductByIdFromCart);


export default cartRouter;