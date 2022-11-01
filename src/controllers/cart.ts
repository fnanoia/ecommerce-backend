import { Request, Response } from "express";
import { Cart } from "../services/cart";
import { Products } from "../services/products";

export const getAllCarts = async (_req: Request, res: Response) => {
  try {
    const cart = await Cart.getAll();

    return res.send(cart);
  } catch (error) {
    return console.log(error);
  }
};

export const getCartById = async (req: Request, res: Response) => {
  try {
    const id = JSON.parse(req.params.id);
    const cart = await Cart.getCartById(id);
    if (!cart) return res.status(400).send("Cart not found");

    return res.send(cart);
  } catch (error) {
    return console.log(error);
  }
};

export const createCart = async (_req: Request, res: Response) => {
  try {
    const newCart: any = await Cart.create();
    const { id } = newCart;

    return res.send({ id });
  } catch (error) {
    return console.log(error);
  }
};

export const deleteCartById = async (req: Request, res: Response) => {
  try {
    const id = JSON.parse(req.params.id);
    const cart = await Cart.getCartById(id);
    if (!cart) return res.status(400).send("Cart not found");

    await Cart.deleteCartById(id);

    return res.status(200).send("Cart deleted successfully");
  } catch (error) {
    return console.log(error);
  }
};

export const getProductsByCartId = async (req: Request, res: Response) => {
  try {
    const id = JSON.parse(req.params.id);
    const cart = await Cart.getCartById(id);
    if (!cart) return res.status(400).send("Cart not found");

    const prod = await Cart.getCartById(id);
    console.log(prod);

    return res.send(prod);
  } catch (error) {
    return console.log(error);
  }
};

export const addProductToCart = async (req: Request, res: Response) => {
  try {
    //busco producto que quiero agregar. utilizo servicios de product
    const idProd = JSON.parse(req.body.id_prod);
    const prod = await Products.getById(idProd);
    if (!prod) return res.status(400).send("Product not found");
    console.log(prod);

    //selecciono cart por id params
    const id = JSON.parse(req.params.id);
    const cart = await Cart.getCartById(id);
    if (!cart) return res.status(400).send("Cart not found");

    //agregar prod encontrado a cart seleccionado
    await Cart.addProductById(id, prod);

    return res.status(200).send("Product added to cart successfully");
  } catch (error) {
    return console.log(error);
  }
};

export const deleteProductByIdFromCart = async ( req: Request, res: Response) => {
  try {
    //buscar cart por id
    const id = JSON.parse(req.params.id);
    const cart = await Cart.getCartById(id);
    if (!cart) return res.status(400).send("Cart not found");

    //seleccionar id del prod de params
    const idProd = JSON.parse(req.params.id_prod);
    
    //eliminar producto del carrito
    await Cart.deleteProductById(id, idProd);

    return res.status(200).send("Product deleted from cart successfully");
  } catch (error) {
    return console.log(error);
  }
};
