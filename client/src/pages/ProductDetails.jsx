import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ShoppingBag, Leaf, Shield, Truck, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ rating: 5, comment: '', sustainabilityRating: 5 });
    const { dispatch } = useCart();

    // Mock Product Data Fallback
    const mockProducts = [
        {
            _id: '1',
            name: 'Organic Cotton Classic Tee',
            description: 'Made from 100% organic cotton, soft, breathable, and kind to your skin.',
            price: 29,
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop',
            carbonFootprint: 2.5,
            ecoCertifications: ['GOTS', 'Fair Trade'],
            category: 'Men',
            materials: 'Organic Cotton'
        },
        {
            _id: '2',
            name: 'Upcycled Denim Jacket',
            description: 'Vintage denim given a new life. Each piece is unique and saves water.',
            price: 89,
            image: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?q=80&w=800&auto=format&fit=crop',
            carbonFootprint: 5.0,
            ecoCertifications: ['Recycled Claim'],
            category: 'Women',
            materials: 'Recycled Denim'
        },
        // Add other mocks if needed default to basic one
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Product
                // In a real app, we would make an API call. For now, try API, fallback to mock.
                try {
                    const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/products/${id}`);
                    setProduct(res.data);
                } catch (e) {
                    // Fallback logic for demo
                    const mock = mockProducts.find(p => p._id === id);
                    if (mock) setProduct(mock);
                    else {
                        // Mock generic product if ID not found in fixed list (for dynamic robustness)
                        setProduct({
                            _id: id,
                            name: 'Sustainable Product',
                            description: 'High quality sustainable product.',
                            price: 49.99,
                            image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop',
                            carbonFootprint: 3.0,
                            ecoCertifications: ['Eco-Friendly'],
                            materials: 'Mixed'
                        });
                    }
                }

                // Fetch Reviews
                try {
                    const reviewRes = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/reviews/${id}`);
                    setReviews(reviewRes.data);
                } catch (e) {
                    console.log("No reviews found or backend offline");
                    setReviews([]);
                }

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleAddToCart = () => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
        alert('Added to cart!');
    };

    const submitReview = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Please login to review');
                return;
            }

            await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/reviews/${id}`, newReview, {
                headers: { 'x-auth-token': token }
            });

            // Refresh reviews
            const reviewRes = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/reviews/${id}`);
            setReviews(reviewRes.data);
            setNewReview({ rating: 5, comment: '', sustainabilityRating: 5 });
            alert('Review submitted!');
        } catch (err) {
            console.error(err);
            alert('Failed to submit review');
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found</div>;

    return (
        <div className="bg-[#fdfbf7] min-h-screen pt-24 pb-12 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Product Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                    {/* Image */}
                    <div className="rounded-2xl overflow-hidden bg-gray-100 aspect-square relative">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold text-green-800 flex items-center gap-1">
                            <Leaf className="h-4 w-4" /> {product.carbonFootprint}kg CO₂e
                        </div>
                    </div>

                    {/* Details */}
                    <div>
                        <div className="mb-2 text-sm font-bold text-primary uppercase tracking-wide">{product.category}</div>
                        <h1 className="text-4xl font-bold mb-4 text-gray-900">{product.name}</h1>
                        <p className="text-2xl font-bold text-gray-900 mb-6">${product.price}</p>

                        <p className="text-gray-600 mb-8 leading-relaxed">
                            {product.description}
                        </p>

                        {/* Certifications */}
                        <div className="mb-8">
                            <h3 className="font-bold text-gray-900 mb-3">Certifications & Impact</h3>
                            <div className="flex flex-wrap gap-2">
                                {product.ecoCertifications?.map((cert, i) => (
                                    <span key={i} className="px-3 py-1 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700 font-medium">
                                        {cert}
                                    </span>
                                ))}
                                <span className="px-3 py-1 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700 font-medium">
                                    Material: {product.materials}
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-4 mb-8">
                            <button onClick={handleAddToCart} className="flex-1 bg-black text-white font-bold py-4 rounded-full hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
                                <ShoppingBag className="h-5 w-5" /> Add to Cart
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-2"><Truck className="h-4 w-4" /> Carbon Neutral Shipping</div>
                            <div className="flex items-center gap-2"><Shield className="h-4 w-4" /> Verified Sustainable</div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Review List */}
                        <div className="space-y-6">
                            {reviews.length === 0 ? (
                                <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                            ) : (
                                reviews.map((rev, i) => (
                                    <div key={i} className="border-b border-gray-100 pb-6">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="font-bold">{rev.user?.name || 'Anonymous user'}</div>
                                            <div className="flex text-yellow-400">
                                                {[...Array(5)].map((_, stars) => (
                                                    <Star key={stars} className={`h-4 w-4 ${stars < rev.rating ? 'fill-current' : 'text-gray-300'}`} />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-gray-600 mb-2">{rev.comment}</p>
                                        <div className="text-xs text-green-600 font-medium flex items-center gap-1">
                                            <Leaf className="h-3 w-3" /> Sustainability Rating: {rev.sustainabilityRating}/5
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Add Review Form */}
                        <div className="bg-gray-50 p-6 rounded-xl h-fit">
                            <h3 className="font-bold text-lg mb-4">Write a Review</h3>
                            <form onSubmit={submitReview} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Rating</label>
                                    <select
                                        className="w-full p-2 rounded-lg border border-gray-300"
                                        value={newReview.rating}
                                        onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                                    >
                                        <option value="5">5 - Excellent</option>
                                        <option value="4">4 - Very Good</option>
                                        <option value="3">3 - Good</option>
                                        <option value="2">2 - Fair</option>
                                        <option value="1">1 - Poor</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Sustainability Rating (1-5)</label>
                                    <select
                                        className="w-full p-2 rounded-lg border border-gray-300"
                                        value={newReview.sustainabilityRating}
                                        onChange={(e) => setNewReview({ ...newReview, sustainabilityRating: Number(e.target.value) })}
                                    >
                                        <option value="5">5 - Very Sustainable</option>
                                        <option value="4">4 - Sustainable</option>
                                        <option value="3">3 - Average</option>
                                        <option value="2">2 - Low Impact</option>
                                        <option value="1">1 - Not Sustainable</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Review</label>
                                    <textarea
                                        className="w-full p-2 rounded-lg border border-gray-300 h-32"
                                        placeholder="Share your thoughts..."
                                        value={newReview.comment}
                                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                        required
                                    ></textarea>
                                </div>

                                <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors">
                                    Submit Review
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
