import mongoose from 'mongoose';
import Shipping from './shippingModel.js';
import Payment from './paymentModel.js';

const orderItemSchema = new mongoose.Schema ({
  id                        : { type: Number, required: true  },
  cartId                    : { type: Number, required: false },
  name                      : { type: String, required: true  },
  quantity                  : { type: Number, required: true  },
  completedBaseImageUrl     : { type: String, required: false },
  mainCategoryId            : { type: Number, required: false },
  variants                  : { type: Array , required: false },
  mockupImage               : { type: String, required: false }, 
  price                     : { type: String, required: true  },
  artworkPlacementDimensions: { type: Object, required: false },
});

const orderSchema = new mongoose.Schema(
  {
    user            : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderId         : { type: Number, required: false } ,
    printfulOrderId : { type: Number, required: false } ,
    orderItems      : [ orderItemSchema               ] ,
    shipping        : Shipping.schema                   ,
    payment         : { type: String, required: false } ,
    taxPrice        : { type: Number, required: false } ,
    shippingPrice   : { type: Number, required: false } ,
    totalPrice      : { type: Number, required: false } ,
    isPaid          : { type: Boolean, default: false } ,
    paidAt          : { type: Date, required: true    } ,
    orderStatus     : { type: String, required: true  } ,
    isDelivered     : { type: Boolean, default: false } ,
    deliveredAt     : { type: String, required: false } ,
    paymentSecret   : { type: String, required: false } ,
    email           : { type: String, required: true  }
  }, 
  { timestamps: true }
);

const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;