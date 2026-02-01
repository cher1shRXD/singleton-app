import { useLocalSearchParams, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Accelerometer } from "expo-sensors";
import { useEffect, useRef, useState } from "react";
import { Alert } from "react-native";
import Cookie from "react-native-cookie";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import WebView from "react-native-webview";

const AppView = () => {
  const { path } = useLocalSearchParams<{ path: string }>();
  const decoded = decodeURIComponent(path);
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [lastShake, setLastShake] = useState(0);
  const alertVisible = useRef(false);

  useEffect(() => {
    const setCookie = async () => {
      const cookie = await SecureStore.getItemAsync("SESSION");
      if (cookie) {
        await Cookie.set("https://cher1shrxd.me", "SESSION", cookie, {
          path: "/",
          domain: ".cher1shrxd.me",
          secure: true,
          httpOnly: true,
        });
      }
    };
    setCookie();
  }, []);

  useEffect(() => {
    Accelerometer.setUpdateInterval(100);
    const subscription = Accelerometer.addListener(({ x, y, z }) => {
      const acceleration = Math.sqrt(x * x + y * y + z * z);
      const now = Date.now();
      if (
        acceleration > 2.2 &&
        now - lastShake > 1000 &&
        !alertVisible.current
      ) {
        setLastShake(now);
        alertVisible.current = true;
        Alert.alert("앱 나가기", "앱 목록으로 이동할까요?", [
          {
            text: "취소",
            style: "cancel",
            onPress: () => {
              alertVisible.current = false;
            },
          },
          {
            text: "확인",
            onPress: () => {
              alertVisible.current = false;
              router.replace("/apps");
            },
          },
        ]);
      }
    });
    return () => {
      subscription.remove();
      alertVisible.current = false;
    };
  }, []);

  return (
    <WebView
      style={{ flex: 1 }}
      source={{
        uri: `${decoded}/?top=${insets.top}&bottom=${insets.bottom}`,
      }}
      scrollEnabled={false}
      sharedCookiesEnabled={true}
      thirdPartyCookiesEnabled={true}
    />
  );
};

export default AppView;
