const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const auth = require('../middleware/auth'); // Assuming you have auth middleware

// Get reviews for a product
router.get('/:productId', async (req, res) => {
    try {
        const reviews = await Review.find({ product: req.params.productId }).populate('user', 'name');
        res.json(reviews);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Post a review (Buyers only)
router.post('/:productId', auth, async (req, res) => {
    if (req.user.role === 'seller') {
        return res.status(403).json({ msg: 'Sellers cannot add reviews' });
    }

    const { rating, comment, sustainabilityRating } = req.body;

    try {
        // user can review only once per product? Maybe not strict but good practice. 
        // For now, adhering to user constraints: "each product should have a separate reviews" - this is guaranteed by schema.

        const newReview = new Review({
            user: req.user.id,
            product: req.params.productId,
            rating,
            comment,
            sustainabilityRating
        });

        const review = await newReview.save();

        // Populate user for immediate display
        const populatedReview = await Review.findById(review._id).populate('user', 'name');
        res.json(populatedReview);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Like/Unlike a review
router.put('/:id/like', auth, async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ msg: 'Review not found' });
        }

        // Check if review has already been liked
        if (review.likes.some(like => like.toString() === req.user.id)) {
            // Unlike
            review.likes = review.likes.filter(like => like.toString() !== req.user.id);
        } else {
            // Like
            review.likes.unshift(req.user.id);
        }

        await review.save();
        res.json(review.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Reply to a review (Sellers/Admins)
router.post('/:id/reply', auth, async (req, res) => {
    // Ideally check if it's THE seller of the product, but restriction "disable add review" suggests role focus.
    // User said "he can just like... or reply".
    if (req.user.role !== 'seller' && req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Only sellers can reply' });
    }

    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ msg: 'Review not found' });
        }

        const newReply = {
            user: req.user.id,
            comment: req.body.comment
        };

        review.replies.push(newReply);
        await review.save();

        const populatedReview = await Review.findById(req.params.id)
            .populate('user', 'name')
            .populate('replies.user', 'name');

        res.json(populatedReview.replies);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
