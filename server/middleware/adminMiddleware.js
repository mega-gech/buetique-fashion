export const adminOnly = (req, res, next) => {
  try {
    // req.user comes from protect middleware
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied: Admin only"
      });
    }

    next();

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};