import { AppApi } from "@/entities/app/api";
import { App } from "@/entities/app/types";
import AppItem from "@/entities/app/ui/AppItem";
import { useEffect, useState } from "react";
import { RefreshControl, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const apps = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<App[]>([]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await AppApi.get();
      setData(response.data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchData} />
        } style={{ height: "100%" }}>
        {data.length > 0 ? data.map((app) => (
          <AppItem
            key={app.id}
            data={app}
            isLast={data[data.length - 1].id === app.id}
          />
        )) : (
          <Text style={{ textAlign: "center", marginTop: 20, color: "#666" }}>
            No apps available. Pull down to refresh.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default apps;
