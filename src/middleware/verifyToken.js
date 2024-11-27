import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    // Extract token from Authorization header
    const token = req.header("Authorization")?.split(" ")[1]; // Assumes format "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: "Access denied, no token provided" });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded user information (user.id) to the request object
        req.user = decoded;

        // Proceed to the next middleware/controller
        next();
    } catch (err) {
        return res.status(400).json({ message: "Invalid or expired token" });
    }
};

export default verifyToken;
