import * as AppleAuthentication from "expo-apple-authentication";
import {
    OAuthProvider,
    signInWithCredential,
} from "firebase/auth";
import { auth } from "../services/firebase";

export default function useAppleLogin() {
  const loginWithApple = async () => {
    const response = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });

    const provider = new OAuthProvider("apple.com");
    const credential = provider.credential({
      idToken: response.identityToken!,
    });

    await signInWithCredential(auth, credential);
  };

  return { loginWithApple };
}
