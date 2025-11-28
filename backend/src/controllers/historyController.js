import User from "../models/User.js";
import History from "../models/History.js";

export const addHistoryEntry = async (req, res) => {
  try {
    const { songId, device, context } = req.body;

    if (!songId) {
      return res.status(400).json({ msg: "songId is required" });
    }

    // Get the actual MongoDB user ID
    const user = await User.findOne({ firebaseUid: req.userId });
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Create history entry linked to MongoDB _id
    const entry = await History.create({
      user: user._id,
      song: songId,
      device: device || "mobile",
      context: context || null,
    });

    // Add embedded version too
    await User.findByIdAndUpdate(user._id, {
      $push: {
        listeningHistory: {
          song: songId,
          device: device || "mobile",
          context: context || null,
          playedAt: new Date(),
        },
      },
    });

    return res.status(201).json(entry);

  } catch (err) {
    console.error("addHistoryEntry error:", err);
    return res.status(500).json({
      msg: "Failed to add history",
      error: err.message,
    });
  }
};
