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

      //actualizar timestamp
      const timestamp = Date.now();

      //sobreescribo el objeto
      const newObject = {
        id: findData.id,
        timestamp_prod: timestamp,
        ...object,
      };

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

export const Products = new productsServices("./src/json/products.json");

