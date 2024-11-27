import User from '../models/User.js'

export const userProfileController = async (req, res) => {
    try {
        // Get user id from the decoded JWT token (set by the verifyToken middleware)
        const userId = req.user.id;

        // Find the user by their ID in the database
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Return user profile information
        const { name, email, profilePicture } = user;
        return res.json({ name, email, profilePicture });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};
