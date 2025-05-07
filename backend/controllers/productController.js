import asyncHandler from '../middleware/asyncHandler.js'
import Product from "../models/productModel.js"
import  jwt  from "jsonwebtoken";

// Fetch all products
// @Route GET /api/products
//@access Public

const getProducts = asyncHandler(async (req, res ) => {
    const pageSize = 8;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword ? {name:{$regex: req.query.keyword, $options:"i"}}:{}

    const count = await Product.countDocuments({...keyword})
    const products = await Product.find({...keyword})
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
})


// Fetch all products
// @Route GET /api/products/:id
//@access Public
const getProductById = asyncHandler(async (req, res ) => {
    const product = await Product.findById(req.params.id)
    
    if(product) {
        res.json(product);
    }else{
        res.stauts(404)
        throw new Error("Product not found")
    }
})

// Create a product
// @Route POST /api/products
//@access Private/Admin

const CreateProduct = asyncHandler(async (req, res ) => {
    const product = new Product({
        name:"Sample Name",
        price:0,
        user:req.user._id,
        image:"/images/sample.jpg",
        brand:"Sample Brand",
        category:"Sample Category",
        countInStock:0,
        numReviews:0,
        description:"Sample Description"
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

// update a product
// @Route PUT /api/products/:id
//@access Private/Admin

const updateProduct = asyncHandler(async (req, res ) => {
    const {name, price, description, image, brand,category,countInStock} = req.body
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    const product = await Product.findOne({user: decoded.userId, _id: req.params.id})
    
    if(product){
        product.name = name
        product.price = price
        product.description= description
        product.image=image
        product.brand= brand
        product.category = category
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    }else {
        res.status(404)
        throw new Error("Resource not found")
    }
})


// delete a product
// @Route DELETE /api/products/:id
//@access Private/Admin


const deleteProduct = asyncHandler(async (req, res ) => {
    
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    
    const product = await Product.findOne({user: decoded.userId, _id: req.params.id})

    if(product){
      await Product.deleteOne({_id: product._id});
      res.status(200).json({message: 'Product deleted'});
    }else {
        res.status(404)
        throw new Error("Resource not found")
    }
});


// create a  new review
// @Route POST /api/products/:id/reviews
//@access Private


const createProductReview = asyncHandler(async (req, res ) => {
    const { rating, comment } = req.body;
     
    const product = await Product.findById(req.params.id)

    if(product){
        const alreadyReviewed = product.reviews.find(
            (review) => review.user.toString() === req.user._id.toString()
        );

        if(alreadyReviewed) {
            res.status(400);
            throw new Error('Product already reviewed');
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        };

        product.reviews.push(review);

        product.numReviews = product.reviews.length;

        product.rating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;

        await product.save();
        res.status(201).json({ message: 'Review added' });
    }else {
        res.status(404)
        throw new Error("Resource not found");
    }
});

// Get top rated products
// @Route GET /api/products/top
//@access Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});

const getMerchantProducts = asyncHandler(async (req, res) => {
    
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    
    const products = await Product.find({ user: decoded.userId });
    res.json(products);
});

// @Route GET /api/products/merchant/:id
// @access Public or Private/Admin (depending on your use case)
const getMerchantProductsById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const products = await Product.find({ user: id });
  
    if (products.length === 0) {
      res.status(404);
      throw new Error("No products found for this merchant");
    }
  
    res.json(products);
  });

export {
    getProductById, 
    getProducts, 
    CreateProduct, 
    updateProduct, 
    deleteProduct,
    createProductReview,
    getTopProducts,
    getMerchantProducts,
    getMerchantProductsById
};