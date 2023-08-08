const mongoose = require('mongoose');
const {Schema} = mongoose

const orderSchema = new Schema({
  orders: {
    orderItems: [
      {
        id: { type: Number, required: true },
        name: { type: String, required: true },
        image: { type: String, required: true },
        description: { type: String, required: true },
        brand: { type: String, required: false },
        category: { type: String, required: false },
        price: { type: Number, required: true },
        countInStock: { type: Number, required: true },
        rating: { type: Number, required: false },
        numReviews: { type: Number, required: true },
        qty: { type: Number, required: true }
      }
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true }
    },
    paymentMethod: { type: String, required: true },
    totalPrice: { type: Number, required: true }
  },
  user_id: {type:String , required:false},
  isPaid: {type:Boolean, required:true},
  isDelivered: {type:Boolean,required:true },
  
  
});

const order = mongoose.model('order', orderSchema);

module.exports = order;
