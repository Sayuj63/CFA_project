import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { TreePine, Wind, ShoppingBag, Globe, ArrowUpRight } from 'lucide-react';

const Impact = () => {
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalCarbonOffset: 0,
        treesPlanted: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/impact/platform');
                // Animate numbers (simple logic for now, or just set them)
                setStats(res.data);
            } catch (err) {
                console.error(err);
                // Fallback mock data
                setStats({ totalOrders: 1240, totalCarbonOffset: 5300, treesPlanted: 215 });
            }
        };
        fetchStats();
    }, []);

    const StatCard = ({ icon: Icon, title, value, unit, color }) => (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
        >
            <div className={`absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity`}>
                <Icon className="w-32 h-32" />
            </div>

            <div className={`inline-flex p-3 rounded-2xl ${color} bg-opacity-10 mb-6`}>
                <Icon className={`w-8 h-8 ${color.replace('bg-', 'text-')}`} />
            </div>

            <h3 className="text-gray-500 font-medium mb-2">{title}</h3>
            <div className="flex items-baseline gap-1">
                <span className="text-4xl sm:text-5xl font-bold text-gray-900">{value.toLocaleString()}</span>
                {unit && <span className="text-xl text-gray-400 font-medium">{unit}</span>}
            </div>

            <div className="mt-6 flex items-center text-sm font-medium text-gray-400 group-hover:text-primary transition-colors cursor-pointer">
                View Details <ArrowUpRight className="w-4 h-4 ml-1" />
            </div>
        </motion.div>
    );

    return (
        <div className="bg-[#fdfbf7] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="max-w-7xl mx-auto text-center mb-16">
                <div className="inline-flex items-center justify-center p-2 bg-green-100 rounded-full mb-4">
                    <Globe className="w-4 h-4 text-green-700 mr-2" />
                    <span className="text-xs font-bold text-green-800 uppercase tracking-wider">Our Impact</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                    Making a Difference, <br />
                    <span className="text-primary relative">
                        One Stitch at a Time
                        <svg className="absolute w-full h-3 -bottom-1 left-0 text-green-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                        </svg>
                    </span>
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    Transparency is at our core. See how your choices at EcoWear contribute to a healthier planet.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <StatCard
                    icon={ShoppingBag}
                    title="Sustainable Orders"
                    value={stats.totalOrders}
                    color="bg-blue-500 text-blue-600"
                />
                <StatCard
                    icon={Wind}
                    title="CO2e Saved"
                    value={stats.totalCarbonOffset}
                    unit="kg"
                    color="bg-green-500 text-green-600"
                />
                <StatCard
                    icon={TreePine}
                    title="Trees Planted"
                    value={stats.treesPlanted}
                    color="bg-emerald-600 text-emerald-700"
                />
            </div>

            {/* Story/Content Section */}
            <div className="max-w-7xl mx-auto mt-24">
                <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 lg:flex">
                    <div className="lg:w-1/2 p-12 lg:p-16 flex flex-col justify-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Why It Matters</h2>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 font-bold">1</div>
                                <div>
                                    <h4 className="font-bold text-lg text-gray-900">Reduce Waste</h4>
                                    <p className="text-gray-500 mt-1">Fashion industry produces 92 million tons of textile waste annually. We use recycled materials to close the loop.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">2</div>
                                <div>
                                    <h4 className="font-bold text-lg text-gray-900">Save Water</h4>
                                    <p className="text-gray-500 mt-1">Conventional cotton shirts take 2,700 liters of water. Ours take 80% less thanks to organic farming.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold">3</div>
                                <div>
                                    <h4 className="font-bold text-lg text-gray-900">Fair Labor</h4>
                                    <p className="text-gray-500 mt-1">Every worker in our supply chain is paid a living wage and works in safe conditions.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/2 bg-gray-50 relative min-h-[400px]">
                        <img
                            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1000"
                            alt="Sustainability"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Impact;
