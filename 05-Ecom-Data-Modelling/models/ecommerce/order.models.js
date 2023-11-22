import mongoose from 'mongoose';

// making new Schema for Order Items
const orederItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orederSchema = new mongoose.Schema(
  {
    orderPrice: {
      type: Number,
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    // Making new schema for multiple order item
    orderItems: {
      type: [orederItemSchema],
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      // enum provided the choices -> same word use
      enum: ["PENDING","CANCELLED","DELIVERD"],
      default: "PENDING"
    }
  },
  { timestamps: true }
);

export const Order = mongoose.model('Order', orederSchema);
