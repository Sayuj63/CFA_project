import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ShoppingBag, Leaf, Shield, Truck, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductDetailsSlug = () => {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ rating: 5, comment: '', sustainabilityRating: 5 });
    const { dispatch } = useCart();

    // Auth State
    const [userRole, setUserRole] = useState(localStorage.getItem('role') || 'buyer');
    const [userId, setUserId] = useState(localStorage.getItem('userId'));

    // Reply State
    const [replyingTo, setReplyingTo] = useState(null); // Review ID being replied to
    const [replyComment, setReplyComment] = useState('');

    // Helper to generate slug from name
    const createSlug = (name) => {
        return name
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');
    };

    // Mock Product Data Fallback (Same as Shop.jsx/ProductDetails.jsx for consistency)
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
        {
            _id: '3',
            name: 'Hemp Cargo Trousers',
            description: 'Durable hemp fabric that gets softer with every wash. Natural antibacterial properties.',
            price: 75,
            image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=800&auto=format&fit=crop',
            carbonFootprint: 3.2,
            ecoCertifications: ['OCS 100'],
            materials: 'Hemp',
            category: 'Men'
        },
        {
            _id: '4',
            name: 'Bamboo Viscose Dress',
            description: 'Silky smooth bamboo fabric, perfect for summer. Biodegradable.',
            price: 65,
            image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=800&auto=format&fit=crop',
            carbonFootprint: 2.1,
            ecoCertifications: ['FSC Certified'],
            materials: 'Bamboo',
            category: 'Women'
        }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Determine API URL based on environment or default to localhost
                const apiUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/products`;

                let foundProduct = null;

                // Try to search via API (fetching all and filtering)
                // This is a workaround since backend doesn't support slug lookup directly
                try {
                    const res = await axios.get(apiUrl);
                    const products = res.data;
                    foundProduct = products.find(p => createSlug(p.name) === slug);
                } catch (e) {
                    console.log("API fetch failed, trying mock data");
                }

                // Fallback to mock if not found in API
                if (!foundProduct) {
                    foundProduct = mockProducts.find(p => createSlug(p.name) === slug);
                }

                setProduct(foundProduct);

                // Fetch Reviews if product found (using ID)
                if (foundProduct) {
                    try {
                        const reviewRes = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/reviews/${foundProduct._id}`);
                        setReviews(reviewRes.data);
                    } catch (e) {
                        console.log("No reviews found or backend offline");
                        setReviews([]);
                    }
                }

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);

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
            if (userRole === 'seller') {
                alert('Sellers cannot submit reviews.');
                return;
            }

            await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/reviews/${product._id}`, newReview, {
                headers: { 'x-auth-token': token }
            });

            // Refresh reviews
            const reviewRes = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/reviews/${product._id}`);
            setReviews(reviewRes.data);
            setNewReview({ rating: 5, comment: '', sustainabilityRating: 5 });
            alert('Review submitted!');
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.msg || 'Failed to submit review');
        }
    };

    const handleLike = async (reviewId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please login to like reviews');
            return;
        }

        try {
            const res = await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/reviews/${reviewId}/like`, {}, {
                headers: { 'x-auth-token': token }
            });

            // Optimistic Update or Refresh
            // Simply updating the specific review in state
            setReviews(reviews.map(rev =>
                rev._id === reviewId ? { ...rev, likes: res.data } : rev
            ));
        } catch (err) {
            console.error(err);
            alert('Failed to like review');
        }
    };

    const submitReply = async (reviewId) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/reviews/${reviewId}/reply`,
                { comment: replyComment },
                { headers: { 'x-auth-token': token } }
            );

            // Update reviews with new replies
            // res.data contains the updated replies array
            setReviews(reviews.map(rev =>
                rev._id === reviewId ? { ...rev, replies: res.data } : rev
            ));

            setReplyingTo(null);
            setReplyComment('');
        } catch (err) {
            console.error(err);
            alert('Failed to submit reply');
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    // Improved "Not Found" state
    if (!product) return (
        <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Product Not Found</h2>
            <Link to="/shop" className="text-primary hover:underline">Return to Shop</Link>
        </div>
    );

    return (
        <div className="bg-[#fdfbf7] min-h-screen pt-24 pb-12 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Product Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                    {/* Image */}
                    <div className="rounded-2xl overflow-hidden bg-gray-100 aspect-square relative shadow-sm">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold text-green-800 flex items-center gap-1 shadow-sm">
                            <Leaf className="h-4 w-4" /> {product.carbonFootprint}kg CO₂e
                        </div>
                    </div>

                    {/* Details */}
                    <div className="flex flex-col justify-center">
                        <div className="mb-2 text-sm font-bold text-primary uppercase tracking-wide">{product.category}</div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 leading-tight">{product.name}</h1>
                        <p className="text-3xl font-bold text-gray-900 mb-6">${product.price}</p>

                        <p className="text-gray-600 mb-8 leading-relaxed text-lg">
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
                            <button onClick={handleAddToCart} className="flex-1 bg-black text-white font-bold py-4 rounded-full hover:bg-gray-800 transition-all flex items-center justify-center gap-2 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                                <ShoppingBag className="h-6 w-6" /> Add to Cart
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-2"><Truck className="h-4 w-4" /> Carbon Neutral Shipping</div>
                            <div className="flex items-center gap-2"><Shield className="h-4 w-4" /> Verified Sustainable</div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                        Customer Reviews <span className="text-sm font-normal text-gray-500">({reviews.length})</span>
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Review List */}
                        <div className="space-y-8">
                            {reviews.length === 0 ? (
                                <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl">
                                    <Star className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                                    <p>No reviews yet. Be the first to review!</p>
                                </div>
                            ) : (
                                reviews.map((rev, i) => (
                                    <div key={i} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="font-bold text-gray-900">{rev.user?.name || 'Anonymous user'}</div>
                                            <div className="flex text-yellow-400">
                                                {[...Array(5)].map((_, stars) => (
                                                    <Star key={stars} className={`h-4 w-4 ${stars < rev.rating ? 'fill-current' : 'text-gray-300'}`} />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-gray-600 mb-2 leading-relaxed">{rev.comment}</p>

                                        <div className="flex items-center justify-between mt-3">
                                            <div className="text-sm text-green-700 font-medium flex items-center gap-1 bg-green-50 w-fit px-2 py-1 rounded">
                                                <Leaf className="h-3 w-3" /> Sustainability Rating: {rev.sustainabilityRating}/5
                                            </div>

                                            {/* Like Button */}
                                            <button
                                                onClick={() => handleLike(rev._id)}
                                                className={`flex items-center gap-1 text-sm font-medium transition-colors ${rev.likes?.includes(userId) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${rev.likes?.includes(userId) ? 'fill-current' : 'none'}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                </svg>
                                                {rev.likes?.length || 0}
                                            </button>
                                        </div>

                                        {/* Replies Section */}
                                        {rev.replies && rev.replies.length > 0 && (
                                            <div className="mt-4 pl-4 border-l-2 border-gray-100 space-y-3">
                                                {rev.replies.map((reply, rid) => (
                                                    <div key={rid} className="bg-gray-50 p-3 rounded-lg text-sm">
                                                        <span className="font-bold text-gray-800 block mb-1">{reply.user?.name || 'Seller'} <span className="text-xs font-normal text-gray-400">• Reply</span></span>
                                                        <p className="text-gray-600">{reply.comment}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Reply Action for Sellers */}
                                        {userRole === 'seller' && (
                                            <div className="mt-3">
                                                {replyingTo === rev._id ? (
                                                    <div className="flex gap-2">
                                                        <input
                                                            type="text"
                                                            value={replyComment}
                                                            onChange={(e) => setReplyComment(e.target.value)}
                                                            className="flex-1 border rounded px-2 py-1 text-sm"
                                                            placeholder="Write a reply..."
                                                        />
                                                        <button onClick={() => submitReply(rev._id)} className="text-xs bg-black text-white px-3 py-1 rounded">Post</button>
                                                        <button onClick={() => setReplyingTo(null)} className="text-xs text-gray-500 px-2">Cancel</button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => setReplyingTo(rev._id)}
                                                        className="text-xs text-primary font-medium hover:underline mt-1"
                                                    >
                                                        Reply to review
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Add Review Form (Hidden for Sellers) */}
                        {userRole !== 'seller' ? (
                            <div className="bg-gray-50 p-6 rounded-2xl h-fit border border-gray-100">
                                <h3 className="font-bold text-lg mb-4 text-gray-900">Write a Review</h3>
                                <form onSubmit={submitReview} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1 text-gray-700">Rating</label>
                                            <div className="relative">
                                                <select
                                                    className="w-full p-2.5 rounded-lg border border-gray-200 bg-white appearance-none cursor-pointer focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                                    value={newReview.rating}
                                                    onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                                                >
                                                    <option value="5">5 - Excellent</option>
                                                    <option value="4">4 - Very Good</option>
                                                    <option value="3">3 - Good</option>
                                                    <option value="2">2 - Fair</option>
                                                    <option value="1">1 - Poor</option>
                                                </select>
                                                <Star className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-1 text-gray-700">Eco-Rating</label>
                                            <div className="relative">
                                                <select
                                                    className="w-full p-2.5 rounded-lg border border-gray-200 bg-white appearance-none cursor-pointer focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                                    value={newReview.sustainabilityRating}
                                                    onChange={(e) => setNewReview({ ...newReview, sustainabilityRating: Number(e.target.value) })}
                                                >
                                                    <option value="5">5 - Excellent</option>
                                                    <option value="4">4 - High</option>
                                                    <option value="3">3 - Average</option>
                                                    <option value="2">2 - Low</option>
                                                    <option value="1">1 - Poor</option>
                                                </select>
                                                <Leaf className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-gray-700">Your Review</label>
                                        <textarea
                                            className="w-full p-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none h-32 resize-none"
                                            placeholder="Share your thoughts on quality and sustainability..."
                                            value={newReview.comment}
                                            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                            required
                                        ></textarea>
                                    </div>

                                    <button type="submit" className="w-full bg-black text-white font-bold py-3.5 rounded-xl hover:bg-gray-800 transition-colors shadow-lg">
                                        Submit Review
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div className="h-fit p-6 bg-blue-50 text-blue-800 rounded-2xl border border-blue-100 text-center">
                                <p className="font-medium">Sellers cannot submit reviews.</p>
                                <p className="text-sm mt-2">You can reply to customer reviews on your products.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsSlug;
