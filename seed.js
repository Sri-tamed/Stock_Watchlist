const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Stock = require('./models/Stock');

dotenv.config();

const sampleTickers = ['GOOGL', 'TSLA', 'MSFT', 'AMZN', 'NVDA'];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected for seeding...');

    await Stock.deleteMany({});
    console.log('Cleared existing stocks.');

    const stocksToInsert = sampleTickers.map(ticker => ({ name: ticker }));
    await Stock.insertMany(stocksToInsert);

    console.log('Database seeded successfully!');
  } catch (err) {
    console.error('Seeding error:', err.message);
  } finally {
    mongoose.connection.close();
    console.log('MongoDB connection closed.');
  }
};

seedDB();
