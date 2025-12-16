const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const jwt = require('jsonwebtoken');
const Product = require('../models/Product');

// Middleware
const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

// GET Platform Impact (Public)
router.get('/platform', async (req, res) => {
    try {
        // Calculate total products sold and estimated CO2 saved (dummy logic: assuming each sustainable product saves 5kg CO2 vs conventional)
        const orders = await Order.find().populate('products.product');
        let totalOrders = orders.length;
        let totalCarbonOffset = 0;

        orders.forEach(order => {
            order.products.forEach(item => {
                if (item.product && item.product.carbonFootprint) {
                    // Assuming carbonFootprint is what is SAVED or just a metric.
                    // For now, let's treat it as "low carbon footprint", so we can say we saved (Reference - Current)
                    // Let's just sum up the 'carbonFootprint' value as 'CO2e impact'
                    totalCarbonOffset += item.product.carbonFootprint * item.quantity;
                }
            });
        });

        res.json({
            totalOrders,
            totalCarbonOffset,
            treesPlanted: Math.floor(totalCarbonOffset / 20) // Dummy conversion
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
