import express from 'express'
import cors from 'cors';
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";


const app = express();

// Middleware
app.use(cors());
app.use(express.json());


app.use("/api", orderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", productRoutes);


export default app
