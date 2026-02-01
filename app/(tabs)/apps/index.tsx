import { useRouter } from "expo-router";
import { AppApi } from "@/entities/app/api";
import { App } from "@/entities/app/types";
import AppItem from "@/entities/app/ui/AppItem";
import { UserApi } from "@/entities/user/api";
import { User } from "@/entities/user/types";
import { Error } from "@/shared/types/error";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import {
  Alert,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";

const Apps = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<App[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await AppApi.get();
      const userResponse = await UserApi.get();
      setData(response.data);
      setUser(userResponse.data);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await UserApi.logout();
      setUser(null);
      await SecureStore.deleteItemAsync("SESSION");
      router.replace("/");
    } catch (error) {
      const err = error as AxiosError<Error>;
      Alert.alert(
        "Logout Failed",
        err.response?.data.message || "An error occurred during logout.",
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f1f1f1" }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchData} />
        }
        style={{ height: "100%" }}>
        <View style={{ backgroundColor: "#fff", margin: 16, borderRadius: 16, marginBottom: 100 }}>
          {data.length > 0 ? (
            data.map((app) => (
              <AppItem
                key={app.id}
                data={app}
                isLast={data[data.length - 1].id === app.id}
              />
            ))
          ) : (
            <Text
              style={{
                textAlign: "center",
                marginVertical: 20,
                color: "#666",
              }}>
              No Apps available. Pull down to refresh.
            </Text>
          )}
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#fff",
          paddingHorizontal: 24,
          paddingTop: 24,
          paddingBottom: insets.bottom,
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          borderTopWidth: 1,
          borderTopColor: "#eee",
        }}>
        <TouchableOpacity>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {user ? `${user.username}` : "Not logged in"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={logout}>
          <Text style={{ color: "#ff6969", fontSize: 16 }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Apps;
