const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    price: { type: Number, default: 0 },
    category: { type: String, default: "" },
    // TODO (TASK 1): add new fields here, e.g. price (Number), category (String)
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);
