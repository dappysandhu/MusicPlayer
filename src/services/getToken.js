import { auth } from "./src/services/firebase";

const token = await auth.currentUser.getIdToken(true);
console.log("TOKEN:", token);
