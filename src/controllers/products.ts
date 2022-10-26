import { Request, Response } from "express";
import { products } from "../services/services";

export const getProducts = async (_req: Request, res: Response) => {
  const prod = await products.getAll();
  return res.send(prod);
};

export const getProductById = async (req: Request, res: Response) => {
  const id = JSON.parse(req.params.id);
  const prod = await products.getById(id);
  return res.send(prod);
};

export const saveProduct = async (req: Request, res: Response) => {
  const { name, price, url } = req.body;
  
  const newProduct = {
    name,
    price,
    url,
  };

  await products.save(newProduct);
  return res.sendStatus(200);
};

export const updateProductById = async (req: Request, res: Response) => {
    const id = JSON.parse(req.params.id);
    const prod = await products.getById(id);
    if(!prod) return res.send("product not found");

    const { name, price, url } = req.body;
    
    const updateProduct = {
      name: name,
      price: price,
      url: url,
    };
  
    await products.updateById(id, updateProduct);
    return res.sendStatus(200);
  };
