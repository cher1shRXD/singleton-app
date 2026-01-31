import { TouchableOpacity, Text } from "react-native";
import { App } from "../types";
import { useRouter } from "expo-router";

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
      }}
      onPress={() => {
        const encoded = encodeURIComponent(data.path);
        router.replace(`/apps/${encoded}`);
      }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>{data.name}</Text>
      <Text style={{ color: "#666" }}>{data.path}</Text>
    </TouchableOpacity>
  );
};

export default AppItem;
