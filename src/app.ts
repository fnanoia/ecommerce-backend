import express, { Application } from "express";
import dotenv from "dotenv";
dotenv.config();
import config from "config";
import connection from "./db/connect";

//init app. define port
const app: Application = express();
const port = config.get<number>("port");

//middlewares
app.use(express.json());

//routers
import productsRouter from "./routes/products.routes";
app.use("/api/products", productsRouter);

import cartRouter from "./routes/cart.routes";
app.use("/api/cart", cartRouter);

//server listener
app.listen(port, () => {
  console.log(`Server on http://localhost:${port}`);

  connection();
});
