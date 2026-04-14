import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 100,
    },
    content: {
      type: String,
      required: true,
      maxLength: 500,
    },
  },
  { timestamps: true }, // ✅ yaha lagta hai
);

export default mongoose.models.Note || mongoose.model("Note", NoteSchema);
