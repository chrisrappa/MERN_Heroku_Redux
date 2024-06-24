import mongoose from 'mongoose';

const paymentSchema = {
  cardName: { type: String, required: false },
  cardNumber: { type: String, required: true },
  expiryMonth: { type: String, required: true },
  expiryYear: { type: String, required: true },
  cvv: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: false },
  addressOne: { type: String, required: true },
  addressTwo: { type: String, required: false },
  city: { type: String, required: true  },
  state: { type: String, required: false },
  stateName: { type: String, required: false},
  zipCode: { type: String, required: true  },
  country: { type: String, required: false  },
  countryName: { type: String, required: false },
  paymentMethodId: { type: String, required: false },
  stripeCustomerId: { type: String, required: false},
  defaultPayment: { type: Boolean, required: false}
};

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;

