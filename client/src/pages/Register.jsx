import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Leaf, ArrowRight } from 'lucide-react';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'buyer' // Default role
    });

    const { name, email, password, role } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const apiUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/auth/register`;
            const res = await axios.post(apiUrl, formData);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('role', res.data.user.role);
            localStorage.setItem('userId', res.data.user.id); // Store User ID
            alert('Registered successfully');
            navigate('/');
        } catch (err) {
            console.error(err);
            if (err.response && err.response.data) {
                alert(err.response.data.msg);
            } else {
                alert("Registration failed. Please check your internet connection or server status.");
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#fdfbf7] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                        <Leaf className="h-6 w-6 text-white" />
                    </div>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Create your account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-primary hover:text-green-500 transition-colors">
                        Sign in
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-xl border border-gray-100 sm:rounded-3xl sm:px-10">
                    <form className="space-y-6" onSubmit={onSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <div className="mt-1">
                                <input id="name" name="name" type="text" required
                                    value={name} onChange={onChange}
                                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-gray-50"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input id="email" name="email" type="email" autoComplete="email" required
                                    value={email} onChange={onChange}
                                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-gray-50"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input id="password" name="password" type="password" autoComplete="new-password" required
                                    value={password} onChange={onChange}
                                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-gray-50"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">I am a...</label>
                            <div className="mt-1 grid grid-cols-2 gap-3">
                                <div
                                    className={`cursor-pointer rounded-xl border p-3 flex justify-center items-center text-sm font-medium transition-all ${role === 'buyer' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 hover:border-gray-300'}`}
                                    onClick={() => setFormData({ ...formData, role: 'buyer' })}
                                >
                                    Buyer
                                </div>
                                <div
                                    className={`cursor-pointer rounded-xl border p-3 flex justify-center items-center text-sm font-medium transition-all ${role === 'seller' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 hover:border-gray-300'}`}
                                    onClick={() => setFormData({ ...formData, role: 'seller' })}
                                >
                                    Seller
                                </div>
                            </div>
                        </div>

                        <div className="pt-2">
                            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all transform hover:-translate-y-0.5">
                                Join EcoWear <ArrowRight className="ml-2 h-4 w-4" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
