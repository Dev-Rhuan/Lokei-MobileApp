import { View, Text, TouchableOpacity } from "react-native";

interface MyButtonProps {
  order?: number;
  children: React.ReactNode;
  onPress: () => void;
}

export const MyButton = (props: MyButtonProps) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View>{props.children}</View>
    </TouchableOpacity>
  );
};
