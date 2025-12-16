const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const checkDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB to check counts...');

        const categories = await Product.distinct('category');
        console.log('Categories found:', categories);

        for (const cat of categories) {
            const count = await Product.countDocuments({ category: cat });
            console.log(`${cat}: ${count}`);
        }

        const all = await Product.countDocuments({});
        console.log(`Total Products: ${all}`);

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkDB();
