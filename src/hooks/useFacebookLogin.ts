import * as Facebook from "expo-facebook";
import { FacebookAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../services/firebase";

export default function useFacebookLogin() {
  const loginWithFacebook = async () => {
    try {
      await Facebook.initializeAsync({
        appId: "FACEBOOK_APP_ID",
      });

      const result = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });

      if (result.type === "success") {
        const credential = FacebookAuthProvider.credential(result.token);

        await signInWithCredential(auth, credential);

        console.log("Facebook login success");
      } else {
        console.log("Facebook login cancelled.");
      }
    } catch (error: any) {
      console.log("Facebook Login Error:", error);
      alert(error.message);
    }
  };

  return { loginWithFacebook };
}
