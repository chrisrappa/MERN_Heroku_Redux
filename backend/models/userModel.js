import mongoose from 'mongoose';
import Shipping from './shippingModel.js';
import Payment from './paymentModel.js';
import Artwork from './artworkModel.js';
import Logo from './logoModel.js';
import Printed from './printedModel.js';

const userSchema = new mongoose.Schema({
  username          : { type: String,            required: true   },
  email             : { type: String,            required: false  }, 
  picture           : { type: String,            required: false  },
  thirdPartyId      : { type: String,            required: false  },
  userCredits       : { type: Number,            required: false  },
  stripeCustomerId  : { type: String,            required: false  },
  shopifyDomain     : { type: String,            required: false  },
  shopifyAccessToken: { type: String,            required: false  },
  savedWorks        : { type: [Artwork.schema ], required: false  },
  shippingAddresses : { type: [Shipping.schema], required: false  },
  paymentMethods    : { type: [Payment.schema ], required: false  },
  logos             : { type: [Logo.schema    ], required: false  },
  printedArtworks   : { type: [Printed.schema ], required: false  },
  isAdmin           : { type: Boolean          , required: false  }
});

const User = mongoose.model("User", userSchema);

export default User;