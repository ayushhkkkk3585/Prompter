// models/Collection.js
import mongoose, { Schema, model, models } from "mongoose";

const CollectionSchema = new Schema({
  name: {
    type: String,
    required: [true, "Collection name is required"],
  },
  description: {
    type: String,
    default: "",
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  prompts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Prompt",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Collection =
  models.Collection || model("Collection", CollectionSchema);

export default Collection;
