import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
  },
  author: {
    type: String,
    required: [true, "Please provide an author"],
  },
  body: {
    type: String,
    required: [true, "Please provide a body"],
  },
});

const Document = mongoose.model("Document", documentSchema);

export default Document;
