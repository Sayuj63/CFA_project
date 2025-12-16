import React from 'react';
import { ShoppingBag, Leaf, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const { dispatch } = useCart();
    return (
        <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
            {/* Image Container */}
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                <Link to={`/product/${product.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')}`} className="block w-full h-full">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                </Link>
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2 pointer-events-none">
                    {product.carbonFootprint < 4 && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 backdrop-blur-sm bg-opacity-90">
                            <Leaf className="h-3 w-3 mr-1" /> Eco Choice
                        </span>
                    )}
                </div>

                {/* Quick Add Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent navigation when clicking add to cart
                        dispatch({ type: 'ADD_TO_CART', payload: product });
                        alert(`${product.name} added to cart!`);
                    }}
                    className="absolute bottom-3 right-3 p-3 rounded-full bg-black text-white shadow-lg hover:bg-gray-800 transition-all duration-300 z-20"
                >
                    <Plus className="h-5 w-5" />
                </button>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <Link to={`/product/${product.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')}`} className="text-base font-bold text-gray-900 line-clamp-1 group-hover:text-primary transition-colors hover:underline">
                        {product.name}
                    </Link>
                </div>

                <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">{product.description}</p>

                <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                    <div>
                        <p className="text-lg font-bold text-gray-900">${product.price}</p>
                        <div className="text-xs text-gray-400 mt-0.5">{product.category}</div>
                    </div>
                    {/* Impact Pill */}
                    <div className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                        {product.carbonFootprint}kg CO₂e
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
