import express from 'express';
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserByID,
    updateUser,
    getMerchants // Import the new getMerchants method
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();
// Route for getting only merchants
router.get('/merchants', getMerchants); // New route to get merchants

router.route("/").post(registerUser).get(protect, admin, getUsers);   // Admin function
router.post("/logout", logoutUser);
router.post("/auth", authUser);
router.route("/profile")
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);
router.route('/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserByID)
    .put(protect, admin, updateUser);


export default router;
