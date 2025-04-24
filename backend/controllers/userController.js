import asyncHandler from '../middleware/asyncHandler.js'
import User from "../models/userModel.js"
import generateToken from '../utils/generateToken.js';


// @decs Auth user & get token
// @Route POST/api/users/login
//@access Public

const authUser = asyncHandler(async (req, res ) => {
    const { email, password } = req.body;

    const user = await User.findOne({email});     //ketu testojme a po pershtaten email apo a exist


    if(user && (await user.matchPassword(password))){  //matchPassword eshte funks qe e kemi kriju per me i compare passat 
        generateToken(res, user._id);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isMerchant: user.isMerchant,
        });
    }else{
        res.status(401);
        throw new Error('Invalid Email or password');
    }
});



// @decs Register user
// @Route POST/api/users/
//@access Public

const registerUser = asyncHandler(async (req, res ) => {
    const { name, email, password, isMerchant } = req.body;

    const userExists = await User.findOne({ email });

    if(userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
        isMerchant: isMerchant || false  // Set default to false if not provided
    });

    if(user) {
        generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isMerchant: user.isMerchant,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});



// @decs Logout user clear cookie
// @Route POST/api/users/logout
//@access Private

const logoutUser = asyncHandler(async (req, res ) => {
    res.cookie('jwt','',{
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message: 'Logged out successfully' });
});


// @decs Get user profile
// @Route GET/api/users/profile
//@access Private

const getUserProfile = asyncHandler(async (req, res ) => {
    const user = await User.findById(req.user._id);

    if(user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isMerchant: user.isMerchant,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @decs Update user profile
// @Route PUT/api/users/profile
//@access Private

const updateUserProfile = asyncHandler(async (req, res ) => {
    const user = await User.findById(req.user._id);

    if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            isMerchant: updatedUser.isMerchant,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});


// @decs Get users
// @Route GET/api/users/
//@access Private/Admin

const getUsers = asyncHandler(async (req, res ) => {
    const users = await User.find({});
    res.status(200).json(users);
});


// @decs Get user by ID
// @Route GET/api/users/:id
//@access Private/Admin

const getUserByID = asyncHandler(async (req, res ) => {
    const user = await User.findById(req.params.id).select('-password');

    if(user) {
        res.status(200).json(user);
    }else{
        res.status(404);
        throw new Error('User not found');
    }
});

// @decs Delete user
// @Route DELETE/api/users/:id
//@access Private/Admin

const deleteUser = asyncHandler(async (req, res ) => {
    const user = await User.findById(req.params.id);

    if(user){
        if(user.isAdmin){
            res.status(400);
            throw new Error('Cannot delete admin user');
        }
        await User.deleteOne({_id: user._id})
        res.status(200).json({message: 'User deleted successfully'});
    }else{
        res.status(404);
        throw new Error('User not found');
    }
});



// @decs Update user
// @Route PUT/api/users/:id
//@access Private/Admin

const updateUser = asyncHandler(async (req, res ) => {
    const user = await User.findById(req.params.id);

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin);
        user.isMerchant = Boolean(req.body.isMerchant);

        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            isMerchant: updatedUser.isMerchant
        });
    }else{
        res.status(404);
        throw new Error('User not found');
    }
});


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserByID,
    updateUser
};