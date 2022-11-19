import { Request, Response } from "express";

//mongo
import { CartServicesMongo } from "../services/cart/cart.mongo";
import { ProductServicesMongo } from "../services/products/products.mongo";

//firebase
import { CartServicesFirebase } from "../services/cart/cart.firebase";
import { ProductServicesFirebase } from "../services/products/products.firebase";

/*
if (process.env.DB_ENV === "firebase") {
 } else {
}
*/

export const getAllCarts = async (_req: Request, res: Response) => {
  try {
    if (process.env.DB_ENV === "firebase") {
      const cart = await CartServicesFirebase.getAll();
      return res.send(cart);
    } else {
      const cart = await CartServicesMongo.getAll();
      return res.send(cart);
    }
  } catch (err: any) {
    return res.status(409).send(err);
  }
};

export const getCartById = async (req: Request, res: Response) => {
  try {
    if (process.env.DB_ENV === "firebase") {
      const cart = await CartServicesFirebase.getCartById(req.params.id);
      if (!cart) return res.status(400).send("Cart not found");
      return res.send(cart);
    } else {
      const cart = await CartServicesMongo.getCartById(req.params.id);
      if (!cart) return res.status(400).send("Cart not found");
      return res.send(cart);
    }
  } catch (err: any) {
    return res.status(409).send(err);
  }
};

export const createCart = async (req: Request, res: Response) => {
  try {
    const { product } = req.body;

    if (!product) {
      return res.status(400).send("Missing fields");
    }

    const newCart = { product };

    if (process.env.DB_ENV === "firebase") {
      const cart = await CartServicesFirebase.create(newCart);
      return res.send(cart);
    } else {
      const cart = await CartServicesMongo.create(newCart);
      return res.send(cart);
    }
  } catch (err: any) {
    return res.status(409).send("Error creating cart" + err);
  }
};

export const deleteCartById = async (req: Request, res: Response) => {
  try {
    if (process.env.DB_ENV === "firebase") {
      const cart = await CartServicesFirebase.getCartById(req.params.id);
      if (!cart) return res.status(400).send("Cart not found");
      await CartServicesFirebase.deleteCartById(req.params.id);

      return res.status(200).send("Cart deleted successfully");
    } else {
      const cart = await CartServicesMongo.getCartById(req.params.id);
      if (!cart) return res.status(400).send("Cart not found");
      await CartServicesMongo.deleteCartById(req.params.id);

      return res.status(200).send("Cart deleted successfully");
    }
  } catch (err: any) {
    return res.status(409).send(err);
  }
};

export const addProductToCart = async (req: Request, res: Response) => {
  try {
    if (process.env.DB_ENV === "firebase") {
      //busco producto que quiero agregar. utilizo servicios de product

      const idProd = req.body.id_prod;
      const prod = await ProductServicesFirebase.getById(idProd);
      if (!prod) return res.status(400).send("Product not found");

      //selecciono cart por id params
      //const id = JSON.parse(req.params.id);
      const cart = await CartServicesFirebase.getCartById(req.params.id);
      if (!cart) return res.status(400).send("Cart not found");

      //agregar prod encontrado a cart seleccionado
      await CartServicesFirebase.addProductById(req.params.id, prod);

      return res.status(200).send("Product added to cart successfully");
    } else {
      const idProd = req.body.id_prod;

      const prod = await ProductServicesMongo.getById(idProd);
      if (!prod) return res.status(400).send("Product not found");
      console.log(prod);

      //const id = JSON.parse(req.params.id);
      const cart = await CartServicesMongo.getCartById(req.params.id);
      if (!cart) return res.status(400).send("Cart not found");

      await CartServicesMongo.addProductById(req.params.id, prod);

      return res.status(200).send("Product added to cart successfully");
    }
  } catch (err: any) {
    return res.status(409).send("Could not add  prod" + err);
  }
};

export const deleteProductByIdFromCart = async (
  req: Request,
  res: Response
) => {
  try {
    const idCart = req.params.id;
    const cart = await CartServicesMongo.getCartById(idCart);
    if (!cart) return res.status(400).send("Cart not found");

    //seleccionar id del prod de params
    const idProd = req.params.id_prod;

    //eliminar producto del carrito
    await CartServicesMongo.deleteProductById(idCart, idProd);

    return res.status(200).send("Product deleted from cart successfully");
  } catch (err: any) {
    return res.status(409).send(err);
  }
};
