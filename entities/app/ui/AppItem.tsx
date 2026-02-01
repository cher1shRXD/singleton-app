import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { App } from "../types";
import Favicon from "../../../shared/ui/Favicon";

interface Props {
  data: App;
  isLast?: boolean;
}

const AppItem = ({ data, isLast = false }: Props) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={{
        padding: 16,
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomColor: "#eee",
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
      }}
      onPress={() => {
        const encoded = encodeURIComponent(data.path);
        router.replace(`/apps/${encoded}`);
      }}>
      <Favicon url={data.path} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{data.name}</Text>
        <Text style={{ color: "#666" }}>{data.path}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AppItem;
