import AnnouncementsModel from "../Announcements/Announcements.model.js";
import QuizzesModel from "../Quizzes/Quizzes.model.js";

export const getMainData = async (req, res, next) => {
  try {
    const quizzes = await QuizzesModel.find().sort({ createdAt: -1 }).limit(2);
    const announcements = await AnnouncementsModel.find()
      .sort({ createdAt: -1 })
      .limit(4);
    return res.status(200).json({
      success: true,
      message: "Quizzes fetched successfully",
      data: { quizzes, announcements },
    });
  } catch (error) {
    next(error);
  }
};
