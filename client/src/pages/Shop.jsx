import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Shop = () => {
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Initial Category from URL or Default 'All'
    const queryParams = new URLSearchParams(location.search);
    const initialCategory = queryParams.get('category');

    // Filter States
    const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'All');
    const [selectedCertifications, setSelectedCertifications] = useState([]);
    const [selectedMaterials, setSelectedMaterials] = useState([]);

    // Consistent Mock Data with reliable images & materials
    const mockProducts = [
        {
            _id: '1',
            name: 'Organic Cotton Classic Tee',
            description: 'Made from 100% organic cotton, soft, breathable, and kind to your skin.',
            price: 29,
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop',
            carbonFootprint: 2.5,
            ecoCertifications: ['GOTS', 'Fair Trade'],
            materials: 'Organic Cotton',
            category: 'Men'
        },
        {
            _id: '2',
            name: 'Upcycled Denim Jacket',
            description: 'Vintage denim given a new life. Each piece is unique and saves water.',
            price: 89,
            image: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?q=80&w=800&auto=format&fit=crop',
            carbonFootprint: 5.0,
            ecoCertifications: ['Recycled Claim'],
            materials: 'Recycled Denim',
            category: 'Women'
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
        const fetchProducts = async () => {
            try {
                // Determine API URL based on environment or default to localhost
                const apiUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/products`;
                const res = await axios.get(apiUrl);

                console.log("Fetched Products:", res.data); // Debug log
                setProducts(res.data);
                setFilteredProducts(res.data);
            } catch (err) {
                console.error("Failed to fetch products:", err);
                alert("Error connecting to server. Please check if the backend is running.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Helper: Toggle selection in array
    const toggleSelection = (item, currentList, setList) => {
        if (currentList.includes(item)) {
            setList(currentList.filter(i => i !== item));
        } else {
            setList([...currentList, item]);
        }
    };

    // Filter Logic
    useEffect(() => {
        if (loading) return;

        let result = products;

        // Category Filter
        if (selectedCategory !== 'All') {
            result = result.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
        }

        // Certification Filter
        if (selectedCertifications.length > 0) {
            result = result.filter(p =>
                p.ecoCertifications && p.ecoCertifications.some(c => selectedCertifications.includes(c))
            );
        }

        // Material Filter
        if (selectedMaterials.length > 0) {
            result = result.filter(p =>
                selectedMaterials.includes(p.materials) // Exact match for simplicity, or includes
            );
        }

        setFilteredProducts(result);
    }, [products, selectedCategory, selectedCertifications, selectedMaterials]);


    const clearAll = () => {
        setSelectedCategory('All');
        setSelectedCertifications([]);
        setSelectedMaterials([]);
    };

    return (
        <div className="bg-[#fdfbf7] min-h-screen">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 py-12 px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-2">Shop Sustainable</h1>
                <p className="text-gray-500 max-w-2xl mx-auto">Curated collection of eco-friendly apparel. Verified impact, transparent sourcing.</p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <div className="w-full lg:w-64 flex-shrink-0">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <SlidersHorizontal className="h-4 w-4" /> Filters
                                </h3>
                                <button onClick={clearAll} className="text-xs text-primary font-medium hover:underline">Clear all</button>
                            </div>

                            {/* Filter Section */}
                            <div className="space-y-6">
                                {/* Category */}
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-900 mb-3 block">Category</h4>
                                    <div className="space-y-2">
                                        {['All', 'Men', 'Women', 'Kids', 'Accessories', 'Footwear', 'Activewear'].map((cat) => (
                                            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedCategory === cat ? 'bg-primary border-primary' : 'border-gray-300 group-hover:border-primary'}`}>
                                                    {selectedCategory === cat && <div className="w-2 h-2 bg-white rounded-full" />}
                                                </div>
                                                <input
                                                    type="radio"
                                                    name="category"
                                                    className="hidden"
                                                    checked={selectedCategory === cat}
                                                    onChange={() => setSelectedCategory(cat)}
                                                />
                                                <span className={`text-sm transition-colors ${selectedCategory === cat ? 'text-primary font-medium' : 'text-gray-600 group-hover:text-primary'}`}>{cat}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Materials Filter [NEW] */}
                                <div className="border-t border-gray-100 pt-6">
                                    <h4 className="text-sm font-semibold text-gray-900 mb-3 block">Material</h4>
                                    <div className="space-y-2">
                                        {['Organic Cotton', 'Recycled Denim', 'Hemp', 'Bamboo', 'Tencel', 'Linen'].map((mat) => (
                                            <label key={mat} className="flex items-center gap-3 cursor-pointer group">
                                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedMaterials.includes(mat) ? 'bg-primary border-primary' : 'border-gray-300 group-hover:border-primary'}`}>
                                                    {selectedMaterials.includes(mat) && <div className="w-2 h-2 bg-white rounded-sm" />}
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    className="hidden"
                                                    checked={selectedMaterials.includes(mat)}
                                                    onChange={() => toggleSelection(mat, selectedMaterials, setSelectedMaterials)}
                                                />
                                                <span className={`text-sm transition-colors ${selectedMaterials.includes(mat) ? 'text-primary font-medium' : 'text-gray-600 group-hover:text-primary'}`}>{mat}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Certifications Filter */}
                                <div className="border-t border-gray-100 pt-6">
                                    <h4 className="text-sm font-semibold text-gray-900 mb-3 block">Certifications</h4>
                                    <div className="space-y-2">
                                        {['GOTS', 'Fair Trade', 'Recycled Claim', 'OCS 100', 'FSC Certified'].map((cert) => (
                                            <label key={cert} className="flex items-center gap-3 cursor-pointer group">
                                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedCertifications.includes(cert) ? 'bg-primary border-primary' : 'border-gray-300 group-hover:border-primary'}`}>
                                                    {selectedCertifications.includes(cert) && <div className="w-2 h-2 bg-white rounded-sm" />}
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    className="hidden"
                                                    checked={selectedCertifications.includes(cert)}
                                                    onChange={() => toggleSelection(cert, selectedCertifications, setSelectedCertifications)}
                                                />
                                                <span className={`text-sm transition-colors ${selectedCertifications.includes(cert) ? 'text-primary font-medium' : 'text-gray-600 group-hover:text-primary'}`}>{cert}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1">
                        {/* Sort Bar */}
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-sm text-gray-500">Showing <span className="font-medium text-gray-900">{filteredProducts.length}</span> results</p>
                            <div className="relative">
                                <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                                    Sort by: Recommended <ChevronDown className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <div key={i} className="h-96 bg-gray-100 animate-pulse rounded-2xl"></div>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map((product) => (
                                        <ProductCard key={product._id} product={product} />
                                    ))
                                ) : (
                                    <div className="col-span-full py-12 text-center text-gray-500">
                                        No products match the selected filters.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
