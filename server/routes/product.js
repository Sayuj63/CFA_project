const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// GET all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().populate('seller', 'name');
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// GET products by seller
router.get('/myproducts', auth, async (req, res) => {
    try {
        const products = await Product.find({ seller: req.user.id });
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// GET product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('seller', 'name');
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.status(500).send('Server Error');
    }
});

// POST create product (Seller only)
router.post('/', auth, async (req, res) => {
    if (req.user.role !== 'seller' && req.user.role !== 'admin') {
        return res.status(401).json({ msg: 'Not authorized as seller' });
    }

    const {
        name, description, price, category, image,
        materials, ecoCertifications, carbonFootprint, productionProcess, stock
    } = req.body;

    try {
        const newProduct = new Product({
            name, description, price, category, image,
            materials, ecoCertifications, carbonFootprint, productionProcess, stock,
            seller: req.user.id
        });

        const product = await newProduct.save();
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: err.message });
    }
});

module.exports = router;
