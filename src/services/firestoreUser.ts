// import { db } from "./firebase";
// import { doc, getDoc, setDoc } from "firebase/firestore";

// export const saveUserToFirestore = async (user: any) => {
//   if (!user?.uid) return;

//   const userRef = doc(db, "users", user.uid);
//   const userSnap = await getDoc(userRef);

//   if (!userSnap.exists()) {
//     await setDoc(userRef, {
//       uid: user.uid,
//       name: user.displayName || "New User",
//       email: user.email || null,
//       photoURL: user.photoURL || null,
//       createdAt: new Date().toISOString(),
//       provider: user.providerData[0]?.providerId || "unknown",
//     });
//   }
// };
