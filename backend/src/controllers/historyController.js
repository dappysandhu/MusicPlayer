import User from "../models/User.js";
import History from "../models/History.js";

// POST /api/history/track-play
export const addHistoryEntry = async (req, res) => {
  try {
    const { songId, device, context } = req.body;

    const entry = await History.create({
      user: req.userId,
      song: songId,
      device: device || "mobile",
      context: context || null,
    });

    // Also embed in User.listeningHistory
    await User.findOneAndUpdate(
      { firebaseUid: req.userId },
      {
        $push: {
          listeningHistory: {
            song: songId,
            device: device || "mobile",
            context: context || null,
          },
        },
      }
    );

    return res.status(201).json(entry);
  } catch (err) {
    console.error("addHistoryEntry error:", err);
    return res.status(500).json({ msg: "Failed to add history" });
  }
};
