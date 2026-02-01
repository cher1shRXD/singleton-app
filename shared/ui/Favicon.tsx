import { Image } from "react-native";

const Favicon = ({ url }: { url: string }) => {
  const faviconUrl = `${url}/favicon.ico`;

  return (
    <Image
      source={{ uri: faviconUrl }}
      style={{ width: 32, height: 32 }}
    />
  );
};

export default Favicon;
