import User from "../models/User.js";

export const ensureUser = async (req, res, next) => {
  try {
    const { uid, email, name, picture } = req.firebaseUser;

    let user = await User.findOne({ firebaseUid: uid });

    if (!user) {
      user = await User.create({
        firebaseUid: uid,
        email,
        name,
        avatarUrl: picture,
        preferredGenres: [],
        preferredLanguages: [],
      });
    }

    // Attach both IDs:
    req.dbUser = user;         
    req.userId = user._id;   
    req.firebaseUid = uid;  

    next();
  } catch (err) {
    console.error("ensureUser error:", err);
    return res.status(500).json({ msg: "User validation failed" });
  }
};
