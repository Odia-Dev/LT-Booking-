import mongoose from 'mongoose';

const VariantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  tag: { type: String },
  features: [{ type: String }],
  images: [{ type: String }] // Phase 7: Variant-specific gallery
});

const ColorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hex: { type: String, required: true },
  price: { type: Number, default: 0 },
  images: [{ type: String }] // Phase 8: Color-specific vehicle images
});

const InteriorColorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hex: { type: String, required: true }
});

const InventorySchema = new mongoose.Schema({
  variant_name: { type: String, required: true },
  exterior_color: { type: String, required: true },
  stock_count: { type: Number, default: 0 }
});

const VehicleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true, required: true },
  model: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true }, // Hatchback, SUV, MPV, etc.
  isNew: { type: Boolean, default: false },
  description: { type: String },
  
  // Media Management (Phase 3)
  image: { type: String, required: true }, // Default/Fallback image
  thumbnailImage: { type: String },
  megaMenuImage: { type: String },
  heroImage: { type: String },
  galleryImages: [{ type: String }],
  
  specs: {
    engine: String,
    mileage: String,
    fuel: String,
    transmission: String,
    safety: String,
  },
  
  available: { type: Boolean, default: true },
  bookingAmount: { type: Number, default: 50000 },
  deliveryTimeline: { type: String, default: '4-6 Weeks' },
  offers: [{ type: String }],
  
  // Customization Options
  variants: [VariantSchema],
  exterior_colors: [ColorSchema],
  interior_colors: [InteriorColorSchema],
  
  // Stock tracking for specific configurations
  inventory: [InventorySchema],
  
}, { timestamps: true });

export default mongoose.models.Vehicle || mongoose.model('Vehicle', VehicleSchema);
