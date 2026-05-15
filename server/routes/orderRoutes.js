import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { checkout, getProducts, getProduct, subscribers , createOrder, getMyOrders} from "../controllers/orderController.js";


const router = express.Router();

router.post("/checkout", checkout);

router.get('/products', getProducts);

router.get('/products/:id', getProduct);

router.post("/newsletter", subscribers);

router.post("/", protect, createOrder);
router.get("/", protect, getMyOrders);

export default router;