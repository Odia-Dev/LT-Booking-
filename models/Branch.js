import mongoose from 'mongoose';

const BranchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String },
  contact_number: { type: String, required: true },
  manager_name: { type: String },
  email: { type: String },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Branch || mongoose.model('Branch', BranchSchema);
