import redis from "../lib/SetupRedis.js";
import Quiz from "./Quizzes.model.js";

export const getAllQuizzesService = async () => {
  try {
    let quizzes;
    // Check cache first
    quizzes = await redis.get("quizzes");

    if (!quizzes) {
      // If not in cache, fetch from DB
      quizzes = await Quiz.find().sort({ createdAt: -1 });
      await redis.set("quizzes", quizzes, { ex: 3600 }); // Cache for 1 hour
    }

    // Return response
    return quizzes;
  } catch (error) {
    throw error;
  }
};

export const getQuizService = async (id) => {
  try {
    //find quiz by ID
    const quiz = await Quiz.findById(id);
    //if not found, throw error
    if (!quiz) throw new Error("Quiz not found");
    return quiz;
  } catch (error) {
    throw error;
  }
};

export const createQuizService = async (quizData) => {
  try {
    // Get data from request body
    const { title, topic, course, type } = quizData;

    // Create new quiz
    const newQuiz = new Quiz({ title, topic, course, type });
    await newQuiz.save();

    // Invalidate cache
    await redis.del("quizzes");
    await redis.del("MainQuizzes");
    // Return response
    return newQuiz;
  } catch (error) {
    throw error;
  }
};

export const updateQuizService = async ({ id, updateData }) => {
  try {
    // Get data from request body
    const { title, topic, course, type } = updateData;

    // Find and update quiz
    const updated = await Quiz.findById(id);

    // If not found, throw error
    if (!updated) throw new Error("Quiz not found");

    // Update fields
    updated.title = title || updated.title;
    updated.topic = topic || updated.topic;
    updated.course = course || updated.course;
    updated.type = type || updated.type;
    await updated.save();

    // Invalidate cache
    await redis.del("quizzes");
    return await redis.del("MainQuizzes");
  } catch (error) {
    throw error;
  }
};

export const deleteQuizService = async (id) => {
  try {
    // Find and delete quiz
    const deleted = await Quiz.findByIdAndDelete(id);

    // If not found, throw error
    if (!deleted) throw new Error("Quiz not found");

    // Invalidate cache
    await redis.del("quizzes");
    await redis.del("MainQuizzes");
    // Return response
    return deleted;
  } catch (error) {
    throw error;
  }
};
