const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Enter your company name"],
      minLength: [3, "Enter atleast 3 characters"],
      maxLength: 50,
    },
    position: {
      type: String,
      required: [true, "Enter the company name"],
      maxLength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      defualt: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
