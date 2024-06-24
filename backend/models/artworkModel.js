import mongoose from 'mongoose';

const artworkSchema = new mongoose.Schema({
  name                : { type: String  , required: false },
  colors              : { type: [String], required: false },
  styles              : { type: [String], required: false },
  lightings           : { type: [String], required: false },
  hostedBaseImageUrl  : { type: String  , required: true  },
  upscaleJobId        : { type: String  , required: false },
  upscaleProcessing   : { type: Boolean , required: false },
  upscaledImageUrl    : { type: String  , required: false },
  upscaleStatus       : { type: String  , required: false } 
});

const artworkModel = mongoose.model("Artwork", artworkSchema);

export default artworkModel;