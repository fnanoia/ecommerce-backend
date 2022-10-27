import { Request, Response } from "express";
import { products } from "../services/services";

export const getProducts = async (_req: Request, res: Response) => {
  try {
    const prod = await products.getAll();

    return res.send(prod);
  } catch (error) {
    return console.log(error);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = JSON.parse(req.params.id);
    const prod = await products.getById(id);
    if (!prod) return res.status(400).send("Product not found");

    return res.send(prod);
  } catch (error) {
    return console.log(error);
  }
};

export const saveProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, url } = req.body;
    if (!name || !price || !url) return res.status(400).send("Empty fields");

    const newProduct = {
      name,
      price,
      url,
    };

    await products.save(newProduct);

    return res.status(200).send("Product saved successfully");
  } catch (error) {
    return console.log(error);
  }
};

export const updateProductById = async (req: Request, res: Response) => {
  try {
    const id = JSON.parse(req.params.id);
    const prod = await products.getById(id);
    if (!prod) return res.status(400).send("Product not found");
        
    const { name, price, url } = req.body;
    if (!name && !price && !url) return res.status(400).send("Empty/wrong fields");

    const updateProduct = {
      name: name || prod.name,
      price: price || prod.price,
      url: url || prod.url,
    };

    await products.updateById(id, updateProduct);

    return res.status(200).send("Product updated successfully");
  } catch (error) {
    return console.log(error);
  }
};

export const deleteProductById = async (req: Request, res: Response) => {
  try {
    const id = JSON.parse(req.params.id);
    const prod = await products.getById(id);
    if (!prod) return res.status(400).send("Product not found");
    
    await products.deleteById(id)

    return res.status(200).send("Product deleted successfully");
  } catch (error) {
    return console.log(error);
  }

};