import mongoose from 'mongoose';

const printedSchema = new mongoose.Schema({
  hostedImageUrl: { type: String, required: true },
});

const printedModel = mongoose.model("Printed", printedSchema);

export default printedModel;