import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShieldCheck, User, XCircle, CheckCircle } from 'lucide-react';

const AdminDashboard = () => {
    const [sellers, setSellers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Mock Fallback Data
    const mockSellers = [
        { _id: '1', name: 'Green Threads Co', email: 'contact@greenthreads.com', isVerified: false, role: 'seller' },
        { _id: '2', name: 'Eco Denim Works', email: 'admin@ecodenim.com', isVerified: true, role: 'seller' },
        { _id: '3', name: 'Hempify', email: 'sales@hempify.io', isVerified: false, role: 'seller' }
    ];

    const fetchSellers = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/auth/sellers`);
            if (res.data && res.data.length > 0) {
                setSellers(res.data);
            } else {
                setSellers(mockSellers);
            }
        } catch (err) {
            console.error(err);
            setSellers(mockSellers);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSellers();
    }, []);

    const verifySeller = async (id) => {
        try {
            // Optimistic update
            const updatedSellers = sellers.map(s => s._id === id ? { ...s, isVerified: true } : s);
            setSellers(updatedSellers);

            await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/auth/verify/${id}`);
            // real fetch potentially if needed, but optimistic is fine for demo
        } catch (err) {
            alert("Verification failed");
            // revert
            fetchSellers();
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="bg-green-100 p-2 rounded-lg">
                                <ShieldCheck className="h-6 w-6 text-green-700" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                                <p className="text-gray-500 text-sm">Verify sellers and manage platform integrity</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        <h2 className="text-lg font-bold mb-4">Pending Verifications</h2>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-gray-600 text-xs font-bold uppercase tracking-wider">
                                    <tr>
                                        <th className="p-4 rounded-tl-lg">Seller Name</th>
                                        <th className="p-4">Email</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4 rounded-tr-lg text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {sellers.map((seller) => (
                                        <tr key={seller._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="p-4 flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                                    <User className="h-4 w-4 text-gray-500" />
                                                </div>
                                                <span className="font-medium text-gray-900">{seller.name}</span>
                                            </td>
                                            <td className="p-4 text-gray-500">{seller.email}</td>
                                            <td className="p-4">
                                                {seller.isVerified ? (
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                                                        <CheckCircle className="h-3 w-3" /> Verified
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">
                                                        Pending
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-4 text-right">
                                                {!seller.isVerified && (
                                                    <button
                                                        onClick={() => verifySeller(seller._id)}
                                                        className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                                    >
                                                        Approve
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
