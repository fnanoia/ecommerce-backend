import { Request, Response } from "express";
import { Products } from "../services/products";

export const getProducts = async (_req: Request, res: Response) => {
  try {
    const prod = await Products.getAll();

    return res.send(prod);
  } catch (error) {
    return console.log(error);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = JSON.parse(req.params.id);
    const prod = await Products.getById(id);
    if (!prod) return res.status(400).send("Product not found");

    return res.send(prod);
  } catch (error) {
    return console.log(error);
  }
};

export const saveProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, url, description, code, stock } = req.body;
    if (!name || !price || !url || !description || !code || !stock)
      return res.status(400).send("Empty fields");

    const newProduct = {
      name,
      price,
      url,
      description,
      code,
      stock,
    };

    await Products.save(newProduct);

    return res.status(200).send("Product saved successfully");
  } catch (error) {
    return console.log(error);
  }
};

export const updateProductById = async (req: Request, res: Response) => {
  try {
    const id = JSON.parse(req.params.id);
    const prod = await Products.getById(id);
    console.log(prod)
    if (!prod) return res.status(400).send("Product not found");

    const { name, price, url, description, code, stock } = req.body;
    if (!name && !price && !url && !description && !code && !stock)
      return res.status(400).send("Empty/wrong fields");

    const updateProduct = {
      name: name ? name : prod.name,
      price: price ? price : prod.price,
      url: url ? url : prod.url,
      description: description ? description : prod.description,
      code: code ? code : prod.code,
      stock: stock ? stock : prod.stock,
    };

    await Products.updateById(id, updateProduct);

    return res.status(200).send("Product updated successfully");
  } catch (error) {
    return console.log(error);
  }
};

export const deleteProductById = async (req: Request, res: Response) => {
  try {
    const id = JSON.parse(req.params.id);
    const prod = await Products.getById(id);
    if (!prod) return res.status(400).send("Product not found");

    await Products.deleteById(id);

    return res.status(200).send("Product deleted successfully");
  } catch (error) {
    return console.log(error);
  }
};
