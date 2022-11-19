import fs from "fs";

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
      //defino index del cart que modifico
      const findDataId = parseData.cart.findIndex(
        (x: any) => x.id === findData.id
      );

      //busco por id, el index del producto en el array y lo elimino
      const findProdId = findData.products.findIndex(
        (x: any) => x.id === idProd
      );
      if (findProdId !== -1) {
        findData.products.splice(findProdId, 1);
      }

      //elimino data vieja
      parseData.cart.splice(findDataId, 1);
      //agrego data modificada
      parseData.cart.push(findData);
      console.log(parseData)

      //re escribo el archivo con la nueva data
      await fs.promises.writeFile(
        this.fileDir,
        `${JSON.stringify(parseData, null, 2)}`
      );
      console.log(`product ${idProd} deleted successfully from cart ${idCart}`);
    } catch (error) {
      console.error(error);
    }
  }
}

export const Cart = new cartServices("./src/json/cart.json");
