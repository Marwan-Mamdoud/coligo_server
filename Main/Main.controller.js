import { getMainDataService } from "./Main.service.js";

export const getMainData = async (req, res, next) => {
  try {
    // Get main data using service
    const data = await getMainDataService();
    // Destructure data
    const { quizzes, announcements } = data;

    // Return response
    return res.status(200).json({
      success: true,
      message: "Quizzes fetched successfully",
      data: { quizzes, announcements },
    });
  } catch (error) {
    next(error);
  }
};
