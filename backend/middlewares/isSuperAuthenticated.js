import jwt from "jsonwebtoken";

export const isSuperAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies.token;   
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated!",
                success: false
            });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY_SUPER_ADMIN);
        req.id = decoded.superAdminId;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Invalid or expired token!",
            success: false
        });
    }
};
