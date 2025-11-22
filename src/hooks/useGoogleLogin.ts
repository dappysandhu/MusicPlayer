import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../services/firebase";

WebBrowser.maybeCompleteAuthSession();

export default function useGoogleLogin() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: "299338463298-pen1u5pr9hnjfjhol5pcp7c09ud6qpo2.apps.googleusercontent.com",
    iosClientId: "299338463298-qo3a18h7c75usumsk02i26emin3ku436.apps.googleusercontent.com",
    androidClientId: "299338463298-4kmq3obvq4djas04ei7o3t2ld5gcmm99.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const idToken = response.authentication?.idToken;
      const credential = GoogleAuthProvider.credential(idToken);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  return { promptGoogleLogin: () => promptAsync() };
}
