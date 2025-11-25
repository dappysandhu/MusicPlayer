import User from "../models/User.js";

// GET /api/auth/me
export const getMe = async (req, res) => {
  try {
    // ensureUser middleware already created/loaded this
    const user = req.dbUser;

    return res.json({
      firebaseUid: user.firebaseUid,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
      preferredLanguages: user.preferredLanguages,
      preferredGenres: user.preferredGenres,
    });
  } catch (err) {
    console.error("getMe error:", err);
    return res.status(500).json({ msg: "Failed to fetch profile" });
  }
};
