const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

const sampleProducts = [
    {
        name: "Classic Organic Tee",
        description: "A soft, breathable organic cotton t-shirt perfect for everyday wear.",
        price: 25,
        category: "Men",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
        materials: "100% Organic Cotton",
        carbonFootprint: 4.5,
        ecoCertifications: ["GOTS"],
        stock: 50
    },
    {
        name: "Recycled Denim Jacket",
        description: "Stylish jacket made from 100% recycled denim fibers.",
        price: 85,
        category: "Men",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
        materials: "Recycled Denim",
        carbonFootprint: 12.0,
        ecoCertifications: ["Recycled Claim Standard"],
        stock: 30
    },
    {
        name: "Linen Summer Dress",
        description: "Lightweight linen dress for hot summer days, sourced sustainably.",
        price: 75,
        category: "Women",
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=800&auto=format&fit=crop",
        materials: "100% Linen",
        carbonFootprint: 6.2,
        ecoCertifications: ["Fair Trade"],
        stock: 40
    },
    {
        name: "Bamboo Yoga Leggings",
        description: "Stretchy and comfortable leggings made from bamboo viscose.",
        price: 45,
        category: "Activewear",
        image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800&auto=format&fit=crop",
        materials: "Bamboo Viscose",
        carbonFootprint: 5.5,
        ecoCertifications: ["Oeko-Tex"],
        stock: 60
    },
    {
        name: "Kids Organic Hoodie",
        description: "Cozy and safe organic cotton hoodie for active kids.",
        price: 35,
        category: "Kids",
        image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=800&auto=format&fit=crop",
        materials: "Organic Cotton",
        carbonFootprint: 3.8,
        ecoCertifications: ["GOTS"],
        stock: 25
    },
    {
        name: "Fun Patterned Kids Tee",
        description: "Bright and fun t-shirt printed with eco-friendly water-based inks.",
        price: 20,
        category: "Kids",
        image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=800&auto=format&fit=crop",
        materials: "Organic Cotton",
        carbonFootprint: 2.5,
        ecoCertifications: ["GOTS"],
        stock: 45
    },
    {
        name: "Vegan Leather Tote",
        description: "Durable and stylish tote bag made from apple leather.",
        price: 110,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop",
        materials: "Apple Skin Leather",
        carbonFootprint: 8.0,
        ecoCertifications: ["PETA Approved Vegan"],
        stock: 20
    },
    {
        name: "Eco-Friendly Sneakers",
        description: "Sneakers made from recycled plastic bottles and natural rubber.",
        price: 95,
        category: "Footwear",
        image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=800&auto=format&fit=crop",
        materials: "Recycled Polyester, Natural Rubber",
        carbonFootprint: 9.5,
        ecoCertifications: ["Fair Trade"],
        stock: 35
    },
    {
        name: "Urban Eco Jacket",
        description: "Modern cut jacket perfect for city living, made with zero-waste pattern.",
        price: 140,
        category: "Men",
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop",
        materials: "Recycled Polyester",
        carbonFootprint: 10.5,
        ecoCertifications: ["BlueSign"],
        stock: 15
    },
    {
        name: "Cork Yoga Mat",
        description: "Non-slip natural cork yoga mat. Antimicrobial and purely sustainable.",
        price: 60,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1592432678016-e910b95255f3?q=80&w=800&auto=format&fit=crop",
        materials: "Natural Cork, Natural Rubber",
        carbonFootprint: 4.0,
        ecoCertifications: ["FSC Certified"],
        stock: 50
    },
    {
        name: "Recycled Wool Scarf",
        description: "Warm and cozy scarf made from post-consumer recycled wool.",
        price: 45,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=800&auto=format&fit=crop",
        materials: "Recycled Wool",
        carbonFootprint: 3.5,
        ecoCertifications: ["RWS (Responsible Wool Standard)"],
        stock: 40
    },
    {
        name: "Hemp Canvas Backpack",
        description: "Rugged and durable backpack for adventures, made from industrial hemp.",
        price: 85,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
        materials: "Hemp Canvas",
        carbonFootprint: 6.0,
        ecoCertifications: ["Fair Labor"],
        stock: 25
    },
    {
        name: "Tencel Midi Skirt",
        description: "Flowy and soft midi skirt made from sustainable wood pulp fibers.",
        price: 68,
        category: "Women",
        image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=800&auto=format&fit=crop",
        materials: "Tencel Lyocell",
        carbonFootprint: 3.0,
        ecoCertifications: ["Oeko-Tex"],
        stock: 35
    },
    {
        name: "Upcycled Patchwork Hoodie",
        description: "One-of-a-kind hoodie created from textile scraps to ensure zero waste.",
        price: 90,
        category: "Men",
        image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop",
        materials: "Upcycled Cotton Blend",
        carbonFootprint: 1.5,
        ecoCertifications: ["Zero Waste Certified"],
        stock: 10
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');

        // Find a user to assign as seller (or create one if none)
        let seller = await User.findOne({ role: 'seller' });

        if (!seller) {
            console.log('No seller found. Creating a test seller...');
            // In a real app we'd hash the password, but for seeding let's try to find ANY user or just make a dummy
            // For simplicity in seed, let's assume we can just look for the first user and make them seller, or we MUST have a seller.
            // Let's create a dummy seller if needed.
            const bcrypt = require('bcryptjs');
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('password123', salt);

            seller = new User({
                name: 'Seed Seller',
                email: 'seedseller@test.com',
                password: hashedPassword,
                role: 'seller',
                isVerified: true
            });
            await seller.save();
        }

        // Clear existing products to prevent duplicates and fix bad data
        await Product.deleteMany({});
        console.log('Cleared existing products...');

        const productsWithSeller = sampleProducts.map(p => ({ ...p, seller: seller._id }));

        await Product.insertMany(productsWithSeller);
        console.log('Database Seeded Successfully!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
