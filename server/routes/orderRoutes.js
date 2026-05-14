import express from "express";
import { checkout, getProducts, getProduct, subscribers } from "../controllers/orderController.js";

const router = express.Router();

router.post("/checkout", checkout);

router.get('/products', getProducts);

router.get('/products/:id', getProduct);

router.post("/newsletter", subscribers);

export default router;