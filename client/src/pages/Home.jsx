import React from 'react';
import { ArrowRight, Star, ShoppingBag, Truck, ShieldCheck, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <div className="bg-[#fdfbf7] min-h-screen font-sans text-[#022c22]">
            {/* Navbar Placeholder (Handled by Layout/App) but we need spacing */}
            <div className="h-20"></div>

            {/* Hero Section */}
            <header className="px-4 py-8 md:px-12 lg:px-24 bg-[#ecebc9] bg-opacity-30 rounded-3xl mx-4 md:mx-8 mb-16 relative overflow-hidden">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="md:w-1/2 z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-[#34d399]"></span>
                            Sustainable Fashion
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
                            Find your <br />
                            <span className="relative inline-block">
                                favorite
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#34d399] opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                                </svg>
                            </span> <br />
                            clothing <span className="bg-[#022c22] text-white px-4 transform -rotate-2 inline-block rounded-lg">collections</span>
                        </h1>
                        <p className="text-gray-600 text-lg mb-8 max-w-md leading-relaxed">
                            Discover ethically made fashion that looks good and feels good.
                            100% Organic materials for a sustainable future.
                        </p>
                        <div className="flex gap-4">
                            <Link to="/shop" className="px-8 py-4 bg-[#022c22] text-white font-bold rounded-full hover:bg-[#064e3b] transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
                                Explore Shop <ArrowRight className="h-4 w-4" />
                            </Link>
                            <div className="flex items-center gap-2 px-6 py-4 bg-white rounded-full font-bold shadow-sm border border-gray-100">
                                <span className="text-[#34d399] font-black">4.9</span>
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}
                                </div>
                                <span className="text-xs text-gray-500 ml-1">(12k+ Reviews)</span>
                            </div>
                        </div>
                    </div>

                    <div className="md:w-1/2 relative mt-12 md:mt-0">
                        {/* Abstract Shape Background */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#022c22] rounded-full opacity-5 blur-3xl"></div>

                        <div className="relative z-10 flex justify-center">
                            <img
                                src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop"
                                alt="Fashion Model"
                                className="h-[500px] object-cover rounded-[3rem] shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500"
                            />
                            {/* Floating Badges */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                className="absolute top-10 right-10 bg-white p-4 rounded-2xl shadow-xl max-w-[150px]"
                            >
                                <div className="flex gap-1 mb-2">
                                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                                        <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden -ml-3">
                                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold -ml-3 border-2 border-white">
                                        1k+
                                    </div>
                                </div>
                                <p className="text-xs font-bold">Happy Customers</p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Features Bar */}
            <div className="max-w-7xl mx-auto px-4 mb-20">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row justify-between gap-8">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-50 rounded-full text-green-700"><Tag className="h-6 w-6" /></div>
                        <div>
                            <h3 className="font-bold text-lg">Ethical Pricing</h3>
                            <p className="text-sm text-gray-500">Fair wages for all workers</p>
                        </div>
                    </div>
                    <div className="w-px h-12 bg-gray-100 hidden md:block"></div>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-50 rounded-full text-green-700"><ShieldCheck className="h-6 w-6" /></div>
                        <div>
                            <h3 className="font-bold text-lg">Premium Quality</h3>
                            <p className="text-sm text-gray-500">Certified organic materials</p>
                        </div>
                    </div>
                    <div className="w-px h-12 bg-gray-100 hidden md:block"></div>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-50 rounded-full text-green-700"><Truck className="h-6 w-6" /></div>
                        <div>
                            <h3 className="font-bold text-lg">Carbon Neutral</h3>
                            <p className="text-sm text-gray-500">Free shipping on orders over $100</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories */}
            <section className="max-w-7xl mx-auto px-4 mb-24">
                <div className="flex justify-between items-end mb-12">
                    <h2 className="text-4xl font-bold">Shop by Category</h2>
                    <Link to="/shop" className="text-sm font-bold uppercase tracking-wider border-b-2 border-black pb-1 hover:text-[#34d399] hover:border-[#34d399] transition-all">View All</Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { name: 'Men Collections', count: '400+ Products', img: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=800&auto=format&fit=crop', link: 'Men' },
                        { name: 'Woman Collections', count: '600+ Products', img: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop', link: 'Women' },
                        { name: 'Kid Collections', count: '300+ Products', img: 'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?q=80&w=800&auto=format&fit=crop', link: 'Kids' },
                        { name: 'Accessories', count: '150+ Products', img: 'https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?q=80&w=800&auto=format&fit=crop', link: 'Accessories' },
                        { name: 'Footwear', count: '200+ Products', img: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=800&auto=format&fit=crop', link: 'Footwear' },
                        { name: 'Activewear', count: '180+ Products', img: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800&auto=format&fit=crop', link: 'Activewear' }
                    ].map((cat, i) => (
                        <Link key={i} to={`/shop?category=${cat.link}`} className="block group relative h-[400px] rounded-[2rem] overflow-hidden cursor-pointer">
                            <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-8 flex flex-col justify-end text-white">
                                <h3 className="text-2xl font-bold mb-1">{cat.name}</h3>
                                <p className="text-white/80 text-sm mb-4">{cat.count}</p>
                                <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider group-hover:gap-4 transition-all">Discover <ArrowRight className="h-4 w-4" /></span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Sale Banner */}
            <section className="bg-[#022c22] py-20 mb-24 relative overflow-hidden text-white">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-[#34d399] rounded-l-full transform translate-x-1/2 opacity-10"></div>

                <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-16">
                    <div className="md:w-1/2">
                        <span className="text-[#34d399] font-bold tracking-widest uppercase mb-4 block">Limited Time Offer</span>
                        <h2 className="text-5xl font-bold mb-6">Payday Sale Now</h2>
                        <p className="text-gray-300 text-lg mb-8 max-w-md">
                            Spend minimal $100 get 30% off voucher code for your next purchase.
                            Sustainable fashion has never been more affordable.
                        </p>
                        <h3 className="text-2xl font-bold mb-8">
                            10% Discount <br /> <span className="text-[#34d399]">for all products</span>
                        </h3>
                        <Link to="/shop" className="bg-white text-[#022c22] px-10 py-4 rounded-full font-bold hover:bg-[#34d399] transition-colors shadow-lg shadow-[#34d399]/20">
                            Shop Now
                        </Link>
                    </div>

                    <div className="md:w-1/2 relative">
                        <div className="relative z-10 bg-white/10 backdrop-blur-md p-2 rounded-[2.5rem] border border-white/20 transform rotate-3 hover:rotate-0 transition-all duration-500">
                            <div className="bg-[#f0f0f0] rounded-[2rem] overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop" alt="Sale Item" className="w-full h-[400px] object-cover" />
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-bold text-xl">Urban Eco Jacket</h4>
                                    <span className="text-2xl font-bold">$140</span>
                                </div>
                                <div className="flex gap-1 text-[#34d399] mb-4">
                                    ★★★★★ <span className="text-white/50 text-xs ml-2">(800 reviews)</span>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Circle */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#34d399] rounded-full blur-3xl opacity-30"></div>
                    </div>
                </div>
            </section>

            {/* Trending Collection Grid */}
            <section className="max-w-7xl mx-auto px-4 mb-24">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Trending Now</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Lightweight, breathable, and 100% organic. Perfect for the season.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { name: 'Casual Hemp Shirt', price: '$45.00', category: 'Men', img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop' },
                        { name: 'Organic Cotton Tee', price: '$29.00', category: 'Woman', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop' },
                        { name: 'Linen Summer Dress', price: '$89.00', category: 'Woman', img: 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?q=80&w=800&auto=format&fit=crop' },
                        { name: 'Recycled Chino', price: '$65.00', category: 'Men', img: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=800&auto=format&fit=crop' },
                        { name: 'Bamboo Activewear', price: '$55.00', category: 'Woman', img: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800&auto=format&fit=crop' },
                        { name: 'Kids Organic Hoodie', price: '$35.00', category: 'Kids', img: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=800&auto=format&fit=crop' },
                        { name: 'Vegan Leather Bag', price: '$120.00', category: 'Accessories', img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop' },
                        { name: 'Eco Denim Jacket', price: '$95.00', category: 'Men', img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop' },
                    ].map((item, i) => (
                        <div key={i} className="group">
                            <div className="bg-gray-100 rounded-3xl overflow-hidden aspect-[3/4] mb-4 relative">
                                <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <button className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#022c22] hover:text-white transition-all transform translate-y-12 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                                    <ShoppingBag className="h-4 w-4" />
                                </button>
                                <div className="absolute top-4 left-4">
                                    <span className="bg-white/90 backdrop-blur-sm text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">{item.category}</span>
                                </div>
                            </div>
                            <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                            <p className="text-gray-500 font-medium">{item.price}</p>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-12">
                    <Link to="/shop" className="px-8 py-3 rounded-full border-2 border-[#022c22] text-[#022c22] font-bold uppercase tracking-wider hover:bg-[#022c22] hover:text-white transition-all">
                        View All Products
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
