import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  author: { type: String, default: 'Laxmi Toyota' },
  faqs: [{
    q: String,
    a: String
  }],
  relatedVehicles: [String],
  published: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
