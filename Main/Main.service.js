import AnnouncementsModel from "../Announcements/Announcements.model.js";
import redis from "../lib/SetupRedis.js";
import QuizzesModel from "../Quizzes/Quizzes.model.js";

export const getMainDataService = async () => {
  try {
    let quizzes, announcements;

    // Check cache first
    quizzes = await redis.get("MainQuizzes");
    announcements = await redis.get("MainAnnouncements");

    if (!quizzes || !announcements) {
      // If not in cache, fetch from DB
      quizzes = await QuizzesModel.find().sort({ createdAt: -1 }).limit(2);
      announcements = await AnnouncementsModel.find()
        .sort({ createdAt: -1 })
        .limit(4);

      // Store in cache
      await redis.set("MainQuizzes", quizzes, { ex: 3600 }); // Cache for 1 hour
      await redis.set("MainAnnouncements", announcements, { ex: 3600 }); // Cache for 1 hour
    }

    // Return response
    return { quizzes, announcements };
  } catch (error) {
    throw error;
  }
};
