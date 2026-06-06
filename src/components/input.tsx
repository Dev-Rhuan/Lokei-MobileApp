import {
  TextInput,
  StyleSheet,
  View,
  TextInputProps,
  Text,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Controller, UseControllerProps } from "react-hook-form";
import { forwardRef, useState } from "react";
import { AccountProps } from "../contexts/AccountFormContext";

type Props = {
  icon?: keyof typeof Feather.glyphMap;
  formProps: UseControllerProps<AccountProps>;
  inputProps?: TextInputProps;
  error?: string;
};

const Input = forwardRef<TextInput, Props>(
  ({ icon, formProps, inputProps, error = "" }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <Controller
        {...formProps}
        render={({ field }) => (
          <View style={styles.container}>
            <View
              style={[
                styles.inputContainer,
                { borderColor: isFocused ? "#F97316" : "#A3A3A3" },
              ]}
            >
              <Feather
                name={icon}
                size={20}
                color={isFocused ? "#F97316" : "#A3A3A3"}
              />
              <TextInput
                ref={ref}
                style={styles.textInput}
                value={field.value}
                onChangeText={field.onChange}
                placeholderTextColor="#A3A3A3"
                onFocus={() => setIsFocused(true)}
                onBlur={() => {
                  setIsFocused(false);
                  field.onBlur();
                }}
                {...inputProps}
              />
            </View>

            {error.length > 0 && <Text style={styles.error}>{error}</Text>}
          </View>
        )}
      />
    );
  },
);

const styles = StyleSheet.create({
  container: {},
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#fff",
    height: 60,
    borderRadius: 22,
    borderWidth: 2,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 16,
    color: "#171717",
    height: "100%",
  },
  error: {
    fontSize: 14,
    marginTop: 7,
    color: "#DC1637",
  },
});

export { Input };
