import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, dispatch } = useCart();

    const removeFromCart = (id) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    };

    const updateQuantity = (id, quantity) => {
        if (quantity < 1) return;
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    };

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="bg-[#fdfbf7] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Sustainable Bag</h1>

                {cart.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                        <h2 className="text-xl font-medium text-gray-900 mb-4">Your bag is empty</h2>
                        <p className="text-gray-500 mb-8">Looks like you haven't added any eco-friendly finds yet.</p>
                        <Link to="/shop" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary hover:bg-green-700 transition-colors">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
                        <div className="lg:col-span-7">
                            <ul className="divide-y divide-gray-100">
                                {cart.map((item) => (
                                    <li key={item._id} className="flex py-6 sm:py-10 bg-white p-6 mb-4 rounded-2xl border border-gray-100 shadow-sm">
                                        <div className="flex-shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-24 h-24 rounded-xl object-center object-cover sm:w-32 sm:h-32 bg-gray-100"
                                            />
                                        </div>

                                        <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                                            <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                <div>
                                                    <div className="flex justify-between">
                                                        <h3 className="text-lg font-bold text-gray-900">
                                                            {item.name}
                                                        </h3>
                                                    </div>
                                                    <div className="mt-1 flex text-sm">
                                                        <p className="text-gray-500">{item.category}</p>
                                                    </div>
                                                    <p className="mt-2 text-sm font-medium text-gray-900">${item.price}</p>
                                                </div>

                                                <div className="mt-4 sm:mt-0 sm:pr-9">
                                                    <div className="flex items-center border border-gray-200 rounded-lg w-max">
                                                        <button
                                                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                            className="p-2 text-gray-600 hover:text-black"
                                                        >
                                                            <Minus className="h-4 w-4" />
                                                        </button>
                                                        <span className="px-2 text-sm font-medium">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                            className="p-2 text-gray-600 hover:text-black"
                                                        >
                                                            <Plus className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                    <div className="absolute top-0 right-0">
                                                        <button
                                                            onClick={() => removeFromCart(item._id)}
                                                            className="-m-2 p-2 inline-flex text-gray-400 hover:text-red-500 transition-colors"
                                                        >
                                                            <Trash2 className="h-5 w-5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-4 flex items-center gap-2">
                                                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-md">
                                                    {item.carbonFootprint} kg CO2e saved
                                                </span>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-5 mt-16 lg:mt-0">
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                                <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>

                                <dl className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-sm text-gray-600">Subtotal</dt>
                                        <dd className="text-sm font-medium text-gray-900">${total.toFixed(2)}</dd>
                                    </div>
                                    <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                                        <dt className="text-base font-bold text-gray-900">Total</dt>
                                        <dd className="text-base font-bold text-gray-900">${total.toFixed(2)}</dd>
                                    </div>
                                </dl>

                                <div className="mt-8">
                                    <button
                                        type="button"
                                        className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all transform hover:-translate-y-1"
                                    >
                                        Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                                    </button>
                                </div>
                                <p className="mt-4 text-xs text-center text-gray-500">
                                    Shipping & taxes calculated at checkout.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
