const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products"
        },
        quantity: {
          type: Number
        },
        totalAmount: Number
      }
    ],
    totalPrice: {
      type: Number
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    isStatus: {
      type: String,
      default: "Process"
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = mongoose.model("orders", orderSchema);