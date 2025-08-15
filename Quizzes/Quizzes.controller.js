import Quiz from "./Quizzes.model.js";

// GET all quizzes
export const getAllQuizzes = async (req, res, next) => {
  try {
    const quizzes = await Quiz.find().sort({ createdAt: -1 });
    res.status(200).json({
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
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) throw new Error("Quiz not found");
    res.status(200).json({
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
    const { title, topic, course, type } = req.body;
    const newQuiz = new Quiz({ title, topic, course, type });
    await newQuiz.save();
    res.status(201).json({
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
    const { title, topic, course, type } = req.body;
    const updated = await Quiz.findById(req.params.id);
    if (!updated) throw new Error("Quiz not found");
    updated.title = title || updated.title;
    updated.topic = topic || updated.topic;
    updated.course = course || updated.course;
    updated.type = type || updated.type;
    await updated.save();
    res.status(200).json({
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
    const deleted = await Quiz.findByIdAndDelete(req.params.id);
    if (!deleted) throw new Error("Quiz not found");
    res.status(200).json({
      success: true,
      message: "Quiz deleted successfully",
      data: deleted,
    });
  } catch (err) {
    next(err);
  }
};
