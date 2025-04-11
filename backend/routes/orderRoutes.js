import  express from 'express';
import {
     addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToDelivered,
    updateOrderToPaid,
    getOrders,
    getMerchantOrders,
 } from '../controllers/orderController.js';
import { protect, admin, merchant } from '../middleware/authMiddleware.js';

const router = express.Router()

router.route("/").post(protect,addOrderItems).get(protect, admin, getOrders);   //admin function
router.route("/merchant").get(getMerchantOrders) //.post(protect,merchant,CreateProduct);

router.route("/mine").get(protect, getMyOrders)
router.route("/:id").get(protect, getOrderById)
router.route("/:id/pay").put(protect, updateOrderToPaid)
router.route("/:id/deliver").put(protect,admin, updateOrderToDelivered)
export default router;