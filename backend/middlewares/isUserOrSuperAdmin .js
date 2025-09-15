import jwt from "jsonwebtoken";

export const isUserOrSuperAdmin = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated!",
        success: false,
      });
    }

    // Pehle user token check karo
    try {
      const decodedUser = jwt.verify(token, process.env.SECRET_KEY_USER);
      req.id = decodedUser.userId;
      req.role = "user";   // role add kar rahe hain for clarity
      return next();
    } catch (err) {
      // Agar user token fail ho jaye to superAdmin check karo
    }

    try {
      const decodedSuperAdmin = jwt.verify(
        token,
        process.env.SECRET_KEY_SUPER_ADMIN
      );
      req.id = decodedSuperAdmin.superAdminId;
      req.role = "superAdmin";  // role add kar rahe hain for clarity
      return next();
    } catch (err) {
      return res.status(401).json({
        message: "Invalid or expired token!",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error in authentication!",
      success: false,
    });
  }
};
