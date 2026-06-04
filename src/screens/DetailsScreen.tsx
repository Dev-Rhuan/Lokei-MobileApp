import { useRoute } from "@react-navigation/native";
import { Text } from "react-native";
import { TRouteProps } from "../Routes";

export const DetailScreen = () => {

    const { params } = useRoute<TRouteProps<"detail">>();

  return (
    <>
      <Text>Details Screen {params.id}</Text>
    </>
  );
};
