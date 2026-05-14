import express from 'express'
import cors from 'cors';
import orderRoutes from "./routes/orderRoutes.js";


const app = express();

// Middleware
app.use(cors());
app.use(express.json());


app.use("/api", orderRoutes);


export default app
