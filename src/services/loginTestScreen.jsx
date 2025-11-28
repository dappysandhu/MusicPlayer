import React from "react";
import { Button } from "react-native";
import api from "../services/api";
import { auth } from "../services/firebase";

export default function TestScreen() {
  const testApi = async () => {
    try {
      const token = await auth.currentUser.getIdToken(true);
      console.log("TOKEN:", token);

      const res = await api.get("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("API RESPONSE:", res.data);
    } catch (err) {
      console.log("ERROR:", err.response?.data || err);
    }
  };

  return <Button title="Test API" onPress={testApi} />;
}
