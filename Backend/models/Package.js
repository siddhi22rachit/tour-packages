import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  availableDates: { type: [String], required: true },
  image: { type: String, required: true },
  highlights: { type: [String] },
});

const Package = mongoose.model('Package', packageSchema);

export default Package;
