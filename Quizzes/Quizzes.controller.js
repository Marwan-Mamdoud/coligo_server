import {
  createQuizService,
  deleteQuizService,
  getAllQuizzesService,
  getQuizService,
  updateQuizService,
} from "./Quizzes.service.js";

// GET all quizzes
export const getAllQuizzes = async (req, res, next) => {
  try {
    // Fetch quizzes using service
    const quizzes = await getAllQuizzesService();

    // Return response
    return res.status(200).json({
      success: true,
      message: "Quizzes fetched successfully",
      data: quizzes,
    });
  } catch (err) {
    next(err);
  }
};

// GET quiz by ID
export const getQuizById = async (req, res, next) => {
  try {
    // Find quiz by ID using service
    const quiz = await getQuizService(req.params.id);

    //return response
    return res.status(200).json({
      success: true,
      message: "Quiz fetched successfully",
      data: quiz,
    });
  } catch (err) {
    next(err);
  }
};

// CREATE quiz
export const createQuiz = async (req, res, next) => {
  try {
    // Create quiz using service
    const newQuiz = await createQuizService(req.body);

    // Return response
    return res.status(201).json({
      success: true,
      message: "Quiz created successfully",
      data: newQuiz,
    });
  } catch (err) {
    next(err);
  }
};

// UPDATE quiz
export const updateQuiz = async (req, res, next) => {
  try {
    // Update quiz using service
    const updated = await updateQuizService({
      id: req.params.id,
      updateData: req.body,
    });

    // Return response
    return res.status(200).json({
      success: true,
      message: "Quiz updated successfully",
      data: updated,
    });
  } catch (err) {
    next(err);
  }
};

// DELETE quiz
export const deleteQuiz = async (req, res, next) => {
  try {
    // Find and delete quiz
    const deleted = await deleteQuizService(req.params.id);

    // Return response
    return res.status(200).json({
      success: true,
      message: "Quiz deleted successfully",
      data: deleted,
    });
  } catch (err) {
    next(err);
  }
};
