import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Accelerometer } from "expo-sensors";
import { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Text, View } from "react-native";
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
  const [isLoading, setIsLoading] = useState(true);

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

  useFocusEffect(
    useCallback(() => {
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
    }, [lastShake, router]),
  );

  return (
    <>
      <WebView
        key={decoded}
        style={{ flex: 1 }}
        source={{
          uri: `${decoded}/?top=${insets.top}&bottom=${insets.bottom}`,
        }}
        scrollEnabled={false}
        sharedCookiesEnabled={true}
        thirdPartyCookiesEnabled={true}
        cacheEnabled={false}
        cacheMode="LOAD_NO_CACHE"
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
      />
      {isLoading && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <ActivityIndicator size="large" />
          <Text style={{ marginTop: 10, fontSize: 18 }}>
            앱을 불러오는 중입니다...
          </Text>
          <Text style={{ marginTop: 4, fontSize: 14, color: "#666" }}>
            Tip: 흔들어서 앱 목록으로 돌아갈 수 있습니다.
          </Text>
        </View>
      )}
    </>
  );
};

export default AppView;
