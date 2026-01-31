import { useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import WebView from "react-native-webview";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import Cookie from 'react-native-cookie';

const AppView = () => {
  const { path } = useLocalSearchParams<{
    path: string;
  }>();
  const decoded = decodeURIComponent(path);
  const insets = useSafeAreaInsets();

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
