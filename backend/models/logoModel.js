import mongoose from 'mongoose';

const logoSchema = new mongoose.Schema({
  cloudinaryUrl: { type: String, required: false },
});

const logoModel = mongoose.model("Logo", logoSchema);

export default logoModel;