const errorHandler = (err, req, res, next) => {
  console.error(`❌ Error: ${err.message}`);

  const statusCode = res.statusCode !== 200 ? res.statusCode : 400;
  if (err.code === 11000) {
    res.status(statusCode).json({
      success: false,
      message: "This Field Must Be Unique",
      stack: process.env.NODE_ENV === "production" ? "🥷" : err.stack,
    });
  }

  // if (err.name === "ValidationError") {
  //   res.status(statusCode).json({
  //     success: false,
  //     message: "Thes is field in not valid",
  //     stack: process.env.NODE_ENV === "production" ? "🥷" : err.stack,
  //   });
  // }

  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥷" : err.stack,
  });
};

export default errorHandler;
