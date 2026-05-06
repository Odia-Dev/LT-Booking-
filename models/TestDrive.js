import mongoose from 'mongoose';

const TestDriveSchema = new mongoose.Schema({
  customer_name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  vehicle_name: { type: String, required: true },
  preferred_date: { type: Date, required: true },
  preferred_branch: { type: String, required: true },
  assigned_executive: { type: String, default: null },
  status: { 
    type: String, 
    enum: ['Requested', 'Scheduled', 'Completed', 'Cancelled'], 
    default: 'Requested' 
  },
  notes: { type: String }
}, { timestamps: true });

export default mongoose.models.TestDrive || mongoose.model('TestDrive', TestDriveSchema);
