import mongoose from "mongoose";
const announcementSchema = new mongoose.Schema(
  {
    // User That Create The Announcement
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: [true, "User Is Required!"],
    // },
    description: { type: String, required: [true, "Description Is Required!"] },
    category: { type: String, required: [true, "Category Is Required!"] },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Announcement", announcementSchema);
