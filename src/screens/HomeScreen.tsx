import { useNavigation } from "@react-navigation/native";
import { Button, Text } from "react-native";
import { TNavigation } from "../Routes";

export const HomeScreen = () => {
  const Navigation = useNavigation<TNavigation>();

  return (
    <>
      <Text>Home Screen</Text>

      <Button
        title="Go to Details"
        onPress={() => Navigation.navigate("detail", { id: 5 })}
      />
    </>
  );
};
