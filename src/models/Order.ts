import mongoose, { Schema, models } from "mongoose";

const orderSchema = new Schema(
  {
    userId: { type: String, required: true },
    items: [
      {
        _id: String,
        title: String,
        image: String,
        price: Number,
        quantity: Number,
      },
    ],
    total: Number,
    email: String,
    address: String,
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

const Order = models.Order || mongoose.model("Order", orderSchema);
export default Order;
