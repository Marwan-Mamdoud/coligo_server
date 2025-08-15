import mongoose from "mongoose";
const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title Is Required!"] },
    topic: { type: String, required: [true, "Topic Is Required!"] },
    course: { type: String, required: [true, "Course Is Required!"] },
    type: {
      type: String,
      enum: ["quiz", "assignment"],
      required: [true, "Type Is Required!"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Quiz", quizSchema);
