import { TextInput, StyleSheet, View, TextInputProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Controller, UseControllerProps } from "react-hook-form";
import { forwardRef } from "react";

type Props = {
  icon?: keyof typeof Feather.glyphMap;
  formProps: UseControllerProps;
  inputProps?: TextInputProps;
};

const Input = forwardRef<TextInput, Props>(
  ({ icon, formProps, inputProps }, ref) => {
    return (
      <Controller
        {...formProps}
        render={({ field }) => (
          <View style={styles.inputContainer}>
            <Feather name={icon} size={24} color={"#A3A3A3"} />
            <TextInput
              ref={ref}
              style={styles.textInput}
              value={field.value}
              onChangeText={field.onChange}
              placeholderTextColor="#A3A3A3"
              {...inputProps}
            />
          </View>
        )}
      />
    );
  },
);

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#fff",
    height: 56,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#A3A3A3",
    paddingHorizontal: 16,
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 20,
    color: "#171717",
    height: "100%",
  },
});

export { Input };
