import fs from "fs";

export class productsServices {
  fileDir: string;

  constructor(fileDir: string) {
    this.fileDir = fileDir;
  }

  async save(object: object) {
    try {
      const data = await fs.promises.readFile(this.fileDir, "utf-8");
      //parseo json para trabajar con array
      const parsedData = JSON.parse(data);

      //obtengo el id del ultimo elemento del array
      const dataIndex = parsedData.products.length;
      const newId = parsedData.products[dataIndex - 1].id;

      //agregar timestamp
      const timestamp = Date.now();

      //agrego el nuevo objeto
      const newObject = { id: newId + 1, timestamp_prod: timestamp, ...object };
      parsedData.products.push(newObject);

      //sobreescribo archivo con nueva data que incluye al objeto
      await fs.promises.writeFile(
        this.fileDir,
        JSON.stringify(parsedData, null, 2)
      );
      console.log("product saved successfully");
    } catch (error) {
      console.error(error);
    }
  }

  async getById(id: string) {
    try {
      const data = await fs.promises.readFile(this.fileDir, "utf-8");

      const parseData = JSON.parse(data);
      const findData = parseData.products.find((x: any) => x.id === id);
      return findData;
    } catch (error) {
      console.error(error);
    }
  }

  async getAll() {
    try {
      const data = await fs.promises.readFile(this.fileDir, "utf-8");
      const parsedData = JSON.parse(data);
      return parsedData.products;
    } catch (error) {
      console.error(error);
    }
  }

  async updateById(id: string, object: object) {
    try {
      const data = await fs.promises.readFile(this.fileDir, "utf-8");
      const parsedData = JSON.parse(data);

      //encuentro por id
      const findData = parsedData.products.find((x: any) => x.id === id);

      //sobreescribo el objeto
      const newObject = { id: findData.id, ...object };

      //elimino el objeto antiguo
      parsedData.products.splice(findData.id - 1, 1);

      //agrego el nuevo objeto
      parsedData.products.push(newObject);

      //ordeno el array por id ascendente
      parsedData.products.sort((a: any, b: any) => a.id - b.id);

      //sobreescribo archivo con nueva data que incluye al objeto
      await fs.promises.writeFile(
        this.fileDir,
        JSON.stringify(parsedData, null, 2)
      );
      console.log("product updated successfully");
    } catch (error) {
      console.error(error);
    }
  }

  async deleteById(id: string) {
    try {
      const data = await fs.promises.readFile(this.fileDir, "utf-8");
      const parseData = JSON.parse(data);
      //filtro los que NO tengan el id que busco y lo guardo en un nuevo array
      const newData = parseData.products.filter((x: any) => x.id !== id);

      //re escribo el archivo con el nuevo array
      await fs.promises.writeFile(
        this.fileDir,
        `{"products":  ${JSON.stringify(newData, null, 2)} }`
      );
      console.log(`product ${id} deleted successfully`);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.fileDir, `{"products": []}`);
      console.log("product deleted succesfully");
    } catch (error) {
      console.error(error);
    }
  }
}

export class cartServices {
  fileDir: string;

  constructor(fileDir: string) {
    this.fileDir = fileDir;
  }

  async create() {
    try {
      const data = await fs.promises.readFile(this.fileDir, "utf-8");
      //parseo json para trabajar con array
      const parsedData = JSON.parse(data);

      //obtengo el id del ultimo elemento del array
      const dataIndex = parsedData.cart.length;
      const newId = parsedData.cart[dataIndex - 1].id;

      //agregar timestamp
      const timestamp = Date.now();

      //agrego el nuevo objeto. con array de productos vacio
      const newObject = {
        id: newId + 1,
        timestamp_prod: timestamp,
        products: [],
      };
      parsedData.cart.push(newObject);

      //sobreescribo archivo con nueva data que incluye al objeto
      await fs.promises.writeFile(
        this.fileDir,
        JSON.stringify(parsedData, null, 2)
      );
      console.log("cart saved successfully");
      return newObject;
    } catch (error) {
      return console.error(error);
    }
  }

  async getCartById(id: string) {
    try {
      const data = await fs.promises.readFile(this.fileDir, "utf-8");
      const parseData = JSON.parse(data);

      const findData = parseData.cart.find((x: any) => x.id === id);
      return findData;
    } catch (error) {
      console.error(error);
    }
  }

  async getAll() {
    try {
      const data = await fs.promises.readFile(this.fileDir, "utf-8");
      const parsedData = JSON.parse(data);
      return parsedData.cart;
    } catch (error) {
      console.error(error);
    }
  }

  async addProductById(id: string, object: object) {
    try {
      const data = await fs.promises.readFile(this.fileDir, "utf-8");
      const parsedData = JSON.parse(data);
      console.log(parsedData);

      //encuentro cart por id
      const findData = parsedData.cart.find((x: any) => x.id === id);

      //agrego la data al array de productos del cart
      findData.products.push(object);
      console.log(parsedData);

      //sobreescribo archivo con nueva data que incluye al objeto
      await fs.promises.writeFile(
        this.fileDir,
        JSON.stringify(parsedData, null, 2)
      );
      console.log("product added to cart successfully");
    } catch (error) {
      console.error(error);
    }
  }

  async deleteCartById(id: string) {
    try {
      const data = await fs.promises.readFile(this.fileDir, "utf-8");
      const parseData = JSON.parse(data);
      //filtro los que NO tengan el id que busco y lo guardo en un nuevo array
      const newData = parseData.cart.filter((x: any) => x.id !== id);

      //re escribo el archivo con el nuevo array
      await fs.promises.writeFile(
        this.fileDir,
        `{"cart":  ${JSON.stringify(newData, null, 2)} }`
      );
      console.log(`id ${id} deleted successfully`);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteProductById(idCart: string, idProd: string) {
    try {
      const data = await fs.promises.readFile(this.fileDir, "utf-8");
      const parseData = JSON.parse(data);

      //encuentro cart por id
      const findData = parseData.cart.find((x: any) => x.id === idCart);

      //genero nuevo array sin el producto seleccionado para eliminar
      const findProd = findData.products.filter((x: any) => x.id !== idProd);

      //actualiza data para sobreescribir
      const newData = { ...findData, products: findProd };

      //re escribo el archivo con la nueva data
      await fs.promises.writeFile(
        this.fileDir,
        `{"cart":  ${JSON.stringify(newData, null, 2)} }`
      );
      console.log(`product ${idProd} deleted successfully`);
    } catch (error) {
      console.error(error);
    }
  }
}

export const Products = new productsServices("./src/services/products.json");
export const Cart = new cartServices("./src/services/cart.json");
