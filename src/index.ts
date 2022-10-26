import express, {Application, Request, Response} from "express";

//init app. define port
const app: Application = express();
const port: number = 3000;

//middlewares
app.use(express.json());

//test route
app.get("/", (_req: Request, res: Response) =>{
    res.send("hello ts");
});

//routers
import productsRouter from "./routes/products";
import cartRouter from "./routes/products";
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);

//server listener
app.listen(port, ()=> {
console.log(`server on ${port}`)
});