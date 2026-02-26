export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.stack || err);

  return res.status(err.statusCode || 500).json({
    error: err.message || "Internal Server Error",
  });
};
