import React, { useState } from 'react';
import axios from 'axios';
import { Upload, Leaf, Tag, Info, DollarSign, Box } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sell = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '', description: '', price: '', category: '', image: '',
        materials: '', carbonFootprint: '', ecoCertifications: '',
        productionProcess: '', stock: ''
    });

    const { name, description, price, category, image, materials, carbonFootprint, ecoCertifications, productionProcess, stock } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please login as a seller first');
            return;
        }

        const config = { headers: { 'Content-Type': 'application/json', 'x-auth-token': token } };
        const body = {
            ...formData,
            price: Number(price),
            stock: Number(stock),
            carbonFootprint: Number(carbonFootprint),
            ecoCertifications: ecoCertifications ? ecoCertifications.split(',').map(c => c.trim()) : []
        };

        try {
            await axios.post('http://localhost:5001/api/products', body, config);
            alert('Product Listed Successfully!');
            navigate('/shop');
        } catch (err) {
            console.error("Full Error:", err);
            const status = err.response?.status;
            const dataMsg = err.response?.data?.msg || JSON.stringify(err.response?.data);
            const errorMsg = dataMsg || err.message || 'Error listing product';

            if (errorMsg.includes('Not authorized') || status === 401) {
                alert(`Authorization Error: You are logged in as a Buyer. Please register a new account as a Seller.`);
            } else {
                alert(`Failed to list product (Status ${status}): ${errorMsg}`);
            }
        }
    };

    return (
        <div className="bg-[#fdfbf7] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">List a new product</h2>
                    <p className="mt-2 text-gray-500">Join our marketplace of sustainable creators.</p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    {/* Header Strip */}
                    <div className="bg-primary/5 p-4 border-b border-primary/10 flex items-center justify-center gap-2 text-primary font-medium text-sm">
                        <Leaf className="w-4 h-4" />
                        <span>All products must meet our sustainability standards</span>
                    </div>

                    <form className="p-8 md:p-12 space-y-8" onSubmit={onSubmit}>
                        {/* Section 1: Basic Info */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Tag className="w-5 h-5 text-gray-400" /> Basic Details
                            </h3>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                                    <input type="text" name="name" value={name} onChange={onChange} required
                                        className="w-full rounded-xl border-gray-200 focus:border-primary focus:ring-primary shadow-sm py-3 px-4 bg-gray-50"
                                        placeholder="e.g. Organic Cotton T-Shirt"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <DollarSign className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <input type="number" name="price" value={price} onChange={onChange} required
                                            className="w-full rounded-xl border-gray-200 focus:border-primary focus:ring-primary shadow-sm py-3 pl-10 px-4 bg-gray-50"
                                            placeholder="29.00"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <select name="category" value={category} onChange={onChange} required
                                        className="w-full rounded-xl border-gray-200 focus:border-primary focus:ring-primary shadow-sm py-3 px-4 bg-gray-50"
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Men">Men</option>
                                        <option value="Women">Women</option>
                                        <option value="Kids">Kids</option>
                                        <option value="Accessories">Accessories</option>
                                    </select>
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea name="description" rows={3} value={description} onChange={onChange} required
                                        className="w-full rounded-xl border-gray-200 focus:border-primary focus:ring-primary shadow-sm py-3 px-4 bg-gray-50"
                                        placeholder="Describe your product..."
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Upload className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <input type="text" name="image" value={image} onChange={onChange} required
                                            className="w-full rounded-xl border-gray-200 focus:border-primary focus:ring-primary shadow-sm py-3 pl-10 px-4 bg-gray-50"
                                            placeholder="https://example.com/image.jpg"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr className="border-gray-100" />

                        {/* Section 2: Sustainability */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Leaf className="w-5 h-5 text-green-500" /> Sustainability Impact
                            </h3>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Materials Used</label>
                                    <input type="text" name="materials" value={materials} onChange={onChange} required
                                        className="w-full rounded-xl border-gray-200 focus:border-primary focus:ring-primary shadow-sm py-3 px-4 bg-gray-50"
                                        placeholder="e.g. 100% Recycled Polyester"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Carbon Footprint (kg CO2e)</label>
                                    <input type="number" name="carbonFootprint" value={carbonFootprint} onChange={onChange} required
                                        className="w-full rounded-xl border-gray-200 focus:border-primary focus:ring-primary shadow-sm py-3 px-4 bg-gray-50"
                                        placeholder="0.0"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Eco Certifications (Comma separated)</label>
                                    <input type="text" name="ecoCertifications" value={ecoCertifications} onChange={onChange}
                                        className="w-full rounded-xl border-gray-200 focus:border-primary focus:ring-primary shadow-sm py-3 px-4 bg-gray-50"
                                        placeholder="GOTS, Fair Trade, Oeko-Tex"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Transparent Sourcing</label>
                                    <textarea name="productionProcess" rows={2} value={productionProcess} onChange={onChange}
                                        className="w-full rounded-xl border-gray-200 focus:border-primary focus:ring-primary shadow-sm py-3 px-4 bg-gray-50"
                                        placeholder="Where was it made? Who made it?"
                                    />
                                </div>
                            </div>
                        </div>

                        <hr className="border-gray-100" />

                        {/* Stock */}
                        <div>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                        <Box className="w-4 h-4 text-gray-400" /> Stock Quantity
                                    </label>
                                    <input type="number" name="stock" value={stock} onChange={onChange} required
                                        className="w-full rounded-xl border-gray-200 focus:border-primary focus:ring-primary shadow-sm py-3 px-4 bg-gray-50"
                                        placeholder="100"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button type="submit" className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all transform hover:-translate-y-1">
                                List Product Now
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Sell;
