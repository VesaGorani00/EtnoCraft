import  express from 'express';
import { getProducts, getProductById, CreateProduct, updateProduct, deleteProduct, createProductReview,getTopProducts, getMerchantProducts} from '../controllers/productController.js';
import {protect,admin, merchant} from "../middleware/authMiddleware.js"
const router = express.Router()

router.route("/").get(getProducts).post(protect,admin,CreateProduct)
router.get("/top", getTopProducts)
router.route("/:id").get(getProductById).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct)
router.route('/:id/reviews').post(protect, createProductReview)

router.route("/merchant").get(getMerchantProducts);

export default router