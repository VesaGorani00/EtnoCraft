import  express from 'express';
import { getProducts, getProductById, CreateProduct, updateProduct, deleteProduct, createProductReview,getTopProducts, getMerchantProducts} from '../controllers/productController.js';
import {protect,admin, merchant, writeRoles} from "../middleware/authMiddleware.js"
const router = express.Router()

router.route("/").get(getProducts).post(protect,admin,CreateProduct)
router.get("/top", getTopProducts)
router.route("/merchant").get(getMerchantProducts).post(protect,merchant,CreateProduct);
router.route("/merchant/:id").get(getProductById).put(protect, merchant, updateProduct).delete(protect, merchant, deleteProduct);


router.route("/:id").get(getProductById).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct)
router.route('/:id/reviews').post(protect, createProductReview)


export default router