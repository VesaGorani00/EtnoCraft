import asyncHandler from '../middleware/asyncHandler.js'
import Order from "../models/orderModel.js"
import jwt from 'jsonwebtoken'

// Create new order
// @Route Post /api/orders
//@access private

const addOrderItems = asyncHandler(async (req, res ) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
    }=req.body

    if(orderItems && orderItems.length === 0){
        res.status(400)
        throw new Error ("No order items")
    }else{
        
        let orderIds = []

        for (let i = 0; i < orderItems.length; i++){
            const orderItem = orderItems[i]
            const item = {
                ...orderItem,
                product: orderItem._id,
                _id:undefined
            }

            const itemsPrice = orderItem.price * orderItem.qty
            const taxPrice = itemsPrice * 0.15
            const shippingPrice = 10
            const totalPrice = itemsPrice + taxPrice + shippingPrice

            const order = new Order({
                orderItems: [item],
                user: req.user._id,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice
            })
    
            const createOrder = await order.save()   
            orderIds.push(createOrder._id) 
        }

        res.status(201).json(orderIds)
    }
})


// Get logged in user orders
// @Route GET /api/orders/myorders
//@access private

const getMyOrders = asyncHandler(async (req, res ) => {
    const orders = await Order.find({user: req.user._id})
    res.status(200).json(orders)
})


// Get order by ID
// @Route Post /api/orders/:id
//@access private

const getOrderById = asyncHandler(async (req, res ) => {
    const order= await Order.findById(req.params.id).populate("user", "name email")

    if (order){
        res.status(200).json(order)
    }else {
        res.status(404)
        throw new Error ("Order not found")
    }
})

// Update order to paid
// @Route PUT /api/orders/:id/pay
//@access private

const updateOrderToPaid = asyncHandler(async (req, res ) => {
    const order = await Order.findById(req.params.id);

    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            // email_address: req.body.payer.email_address,
        };

        const updatedOrder = await order.save();

        res.status(200).json(updatedOrder);
    } else {
        res.status(404);
        throw new Errow('Order not found');
    }
});

// Update order to delivered
// @Route PUT /api/orders/:id/deliver
//@access private/admin
const updateOrderToDelivered = asyncHandler(async (req, res ) => {
    const order= await Order.findById(req.params.id)

    if (order){
        order.isDelivered = true
        order.deliveredAt = Date.now()

        const updatedOrder = await order.save()

        res.status(200).json(updatedOrder)
    }else {
        res.status(404)
        throw new Error ("Order not found")
    }
})

// Get all orders
// @Route GET /api/orders
//@access private/admin

const getOrders = asyncHandler(async (req, res ) => {
    const orders = await Order.find({}).populate("user","id name")
    res.status(200).json(orders)
})

const getMerchantOrders = asyncHandler(async (req, res ) => {
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);

    const orders = await Order.find({user: decoded.userId}).populate("user","id name")
    res.status(200).json(orders)
})


export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToDelivered,
    updateOrderToPaid,
    getOrders,
    getMerchantOrders

}