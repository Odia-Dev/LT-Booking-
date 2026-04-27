const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const VehicleSchema = new mongoose.Schema({
  name: String,
  model: String,
  price: Number,
  image: String,
  description: String,
  specs: { engine: String, mileage: String, fuel: String, transmission: String },
  available: { type: Boolean, default: true },
});

const Vehicle = mongoose.models.Vehicle || mongoose.model('Vehicle', VehicleSchema);

const vehicles = [
  {
    name: 'Toyota Crown',
    model: 'Luxury Sedan',
    price: 6500000,
    image: 'https://images.unsplash.com/photo-1621236304191-7667f70b7793?auto=format&fit=crop&q=80&w=2000',
    description: 'The ultimate expression of luxury and innovation. The Crown redefines the sedan for a new era.',
    specs: { engine: '2.5L Hybrid', mileage: '22.5', fuel: 'Hybrid', transmission: 'e-CVT' }
  },
  {
    name: 'Toyota Fortuner GR-S',
    model: 'Premium SUV',
    price: 5200000,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=2000',
    description: 'Unleash the beast. The Fortuner GR Sport combines rugged capability with track-inspired styling.',
    specs: { engine: '2.8L Diesel', mileage: '14.2', fuel: 'Diesel', transmission: '6-Speed AT' }
  },
  {
    name: 'Toyota Camry',
    model: 'Executive Sedan',
    price: 4600000,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=2000',
    description: 'Sophistication meets efficiency. The Camry Hybrid is the intelligent choice for the modern executive.',
    specs: { engine: '2.5L Hybrid', mileage: '23.2', fuel: 'Hybrid', transmission: 'e-CVT' }
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    await Vehicle.deleteMany({});
    await Vehicle.insertMany(vehicles);
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
}

seed();
