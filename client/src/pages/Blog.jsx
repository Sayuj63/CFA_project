import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User } from 'lucide-react';

const Blog = () => {
    const posts = [
        {
            id: 1,
            title: "Why Sustainable Fashion Matters",
            excerpt: "The fashion industry is responsible for 10% of global carbon emissions. Here's how we can change that.",
            author: "Eco Team",
            date: "Dec 12, 2024",
            category: "Education",
            image: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: 2,
            title: "Understanding Fabric Certifications",
            excerpt: "What does GOTS, Fair Trade, and OCS 100 actually mean? A comprehensive guide.",
            author: "Sarah J.",
            date: "Dec 10, 2024",
            category: "Guides",
            image: "https://images.unsplash.com/photo-1605289982774-9a6fef564df8?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: 3,
            title: "How to Build a Capsule Wardrobe",
            excerpt: "Less is more. Learn how to create a versatile wardrobe with just 30 items.",
            author: "Minimalist Mike",
            date: "Dec 08, 2024",
            category: "Lifestyle",
            image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop"
        }
    ];

    return (
        <div className="bg-[#fdfbf7] min-h-screen pt-24 pb-12 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">The Eco Log</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                        Educational resources, guides, and stories about sustainable fashion and living impacts.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all group">
                            <div className="aspect-[16/10] overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6">
                                <div className="text-xs font-bold text-primary uppercase tracking-wide mb-2">{post.category}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center justify-between pt-4 border-t border-gray-50 text-xs text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <User className="h-3 w-3" /> {post.author}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-3 w-3" /> {post.date}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Newsletter Signup */}
                <div className="mt-20 bg-[#022c22] rounded-3xl p-12 text-center text-white relative overflow-hidden">
                    <div className="relative z-10 max-w-xl mx-auto">
                        <h2 className="text-3xl font-bold mb-4">Join the Movement</h2>
                        <p className="text-gray-300 mb-8">Get the latest guides and sustainable fashion tips directly to your inbox.</p>
                        <div className="flex gap-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:bg-white/20"
                            />
                            <button className="px-8 py-3 rounded-full bg-[#34d399] text-[#022c22] font-bold hover:bg-white transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;
