import admin from "firebase-admin";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const serviceAccount = require("../firebase-service-account.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const firebaseAuth = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ msg: "Missing Authorization header" });

  const token = header.split(" ")[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);

    req.firebaseUser = decoded;
    req.userId = decoded.uid;

    next();
  } catch (err) {
    console.log("🔥 FirebaseAuth Error:", err.message);
    return res.status(401).json({ msg: "Invalid Firebase token" });
  }
};
