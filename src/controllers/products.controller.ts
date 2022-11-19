import { Request, Response } from "express";

//mongo
import { ProductServicesFirebase } from "../services/products/products.firebase";

//firebase
import { ProductServicesMongo } from "../services/products/products.mongo";

//investigar sobre como optimizar el codigo segun la variable de db que se pasa.

export const getProducts = async (_req: Request, res: Response) => {
  try {
    if (process.env.DB_ENV === "firebase") {
      const prod = await ProductServicesFirebase.getAll();
      return res.send(prod);
    } else {
      const prod = await ProductServicesMongo.getAll();
      return res.send(prod);
    }
  } catch (err: any) {
    return res.status(409).send(err);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    if (process.env.DB_ENV === "firebase") {
      const prod = await ProductServicesFirebase.getById(req.params.id);
      if (!prod) return res.status(400).send("Product not found");
      return res.send(prod);
    } else {
      const prod = await ProductServicesMongo.getById(req.params.id);
      if (!prod) return res.status(400).send("Product not found");
      return res.send(prod);
    }
  } catch (err: any) {
    return res.status(409).send("Could not get prod" + err);
  }
};

export const saveProduct = async (req: Request, res: Response) => {
  try {
    const { title, price, url, description, code, stock } = req.body;
    if (!title || !price || !url || !description || !code || !stock)
      return res.status(400).send("Empty fields");

    const newProduct = {
      title,
      price,
      url,
      description,
      code,
      stock,
    };

    if (process.env.DB_ENV === "firebase") {
      await ProductServicesFirebase.save(newProduct);
      return res.status(200).send("Product saved successfully");
    } else {
      await ProductServicesMongo.save(newProduct);
      return res.status(200).send("Product saved successfully");
    }
  } catch (err: any) {
    return res.status(409).send(err);
  }
};

export const updateProductById = async (req: Request, res: Response) => {
  try {
    if (process.env.DB_ENV === "firebase") {
      const prod = await ProductServicesFirebase.getById(req.params.id);

      if (!prod) return res.status(400).send("Product not found");

      const { title, price, imageUrl, description, code, stock } = req.body;
      if (!title && !price && !imageUrl && !description && !code && !stock)
        return res.status(400).send("Empty/wrong fields");

      const updateProduct = {
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description,
        code: code,
        stock: stock,
      };

      await ProductServicesFirebase.updateById(req.params.id, updateProduct);

      return res.status(200).send("Product updated successfully");
    } else {
      const prod = await ProductServicesMongo.getById(req.params.id);

      if (!prod) return res.status(400).send("Product not found");

      const { title, price, imageUrl, description, code, stock } = req.body;
      if (!title && !price && !imageUrl && !description && !code && !stock)
        return res.status(400).send("Empty/wrong fields");

      const updateProduct = {
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description,
        code: code,
        stock: stock,
      };

      await ProductServicesMongo.updateById(req.params.id, updateProduct);

      return res.status(200).send("Product updated successfully");
    }
  } catch (err: any) {
    return res.status(409).send(err);
  }
};

export const deleteProductById = async (req: Request, res: Response) => {
  try {
    if (process.env.DB_ENV === "firebase") {
      const prod = await ProductServicesFirebase.getById(req.params.id);
      if (!prod) return res.status(400).send("Product not found");

      await ProductServicesFirebase.deleteById(req.params.id);

      return res.status(200).send("Product deleted successfully");
    } else {
      const prod = await ProductServicesMongo.getById(req.params.id);
      if (!prod) return res.status(400).send("Product not found");

      await ProductServicesMongo.deleteById(req.params.id);

      return res.status(200).send("Product deleted successfully");
    }
  } catch (err: any) {
    return res.status(409).send(err);
  }
};
