import User from "../models/User.js";

export const ensureUser = async (req, res, next) => {
  const { uid, email, name, picture } = req.firebaseUser;

  let user = await User.findOne({ firebaseUid: uid });

  if (!user) {
    user = await User.create({
      firebaseUid: uid,
      email,
      name,
      avatarUrl: picture,
      preferredGenres: [],
      preferredLanguages: []
    });
  }

  req.dbUser = user;
  next();
};
