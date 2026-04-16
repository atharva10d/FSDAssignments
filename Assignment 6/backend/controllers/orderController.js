const Order = require('../models/Order');
const { syncOrderLog } = require('../utils/excelSync');

// Create new order
const addOrderItems = async (req, res) => {
    const { orderItems, shippingAddress, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
        return res.status(400).json({ message: 'No order items' });
    } else {
        try {
            const order = new Order({
                orderItems,
                user: req.user._id,
                shippingAddress,
                totalPrice,
                isPaid: true, // Mock payment logic
                paidAt: Date.now()
            });

            const createdOrder = await order.save();

            // Format items for Excel
            const productsSummary = orderItems.map(item => `${item.qty}x ${item.name}`).join(', ');
            
            // Append to Excel
            await syncOrderLog(
                req.user.email,
                productsSummary,
                totalPrice,
                'Paid - Processing'
            );

            res.status(201).json(createdOrder);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
};

// Get logged in user orders
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get order by ID
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email');
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = { addOrderItems, getMyOrders, getOrderById };
