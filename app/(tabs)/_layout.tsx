import { Tabs, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect } from "react";

export default function TabLayout() {
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const session = await SecureStore.getItemAsync("SESSION");
      if (session) {
        router.replace("/apps");
      }
    })();
  }, []);
  return (
    <Tabs
      screenOptions={{ headerShown: false, tabBarStyle: { display: "none" } }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="login" />
      <Tabs.Screen name="register" />
      <Tabs.Screen name="apps/index.tsx" />
      <Tabs.Screen name="apps/[path].tsx" />
    </Tabs>
  );
}
