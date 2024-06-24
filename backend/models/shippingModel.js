import mongoose from 'mongoose';

export const shippingSchema = {
  firstName       : { type: String, required: true   },
  lastName        : { type: String, required: true   },
  addressOne      : { type: String, required: true   },
  addressTwo      : { type: String, required: false  },
  city            : { type: String, required: true   },
  stateCode       : { type: String, required: false  },
  stateName       : { type: String, required: false  },
  zipCode         : { type: String, required: true   },
  country         : { type: String, required: true   },
  countryName     : { type: String, required: false  },
  defaultShipping : { type: Boolean, required: false }
};

const Shipping = mongoose.model("Shipping", shippingSchema);

export default Shipping;