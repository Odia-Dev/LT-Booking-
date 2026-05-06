import mongoose from 'mongoose';

const StockSchema = new mongoose.Schema({
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
  vin_number: { type: String, unique: true, required: true },
  variant_name: { type: String, required: true },
  exterior_color: { type: String, required: true },
  interior_color: { type: String },
  status: { type: String, enum: ['In Transit', 'In Stock', 'Reserved', 'Sold'], default: 'In Stock' },
  manufacturing_year: { type: Number },
  price: { type: Number }, // Specific price for this unit if different
  reserved_for_booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }, // If reserved
}, { timestamps: true });

export default mongoose.models.Stock || mongoose.model('Stock', StockSchema);
