import React, { forwardRef, useState } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  TextInputProps,
  Text,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Controller, FieldValues, UseControllerProps } from "react-hook-form";

type Props<T extends FieldValues> = {
  icon?: keyof typeof Feather.glyphMap;
  formProps: UseControllerProps<T>;
  inputProps?: TextInputProps;
  error?: string;
  mask?: "cpf";
  containerStyle?: object;
};

const applyMask = (text: string, maskType?: "cpf") => {
  let value = text.replace(/\D/g, "");

  if (maskType === "cpf") {
    if (value.length > 11) value = value.slice(0, 11);
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return value;
  }

  return text;
};

const Input = forwardRef(
  <T extends FieldValues>(
    { icon, formProps, inputProps, error = "", mask, containerStyle }: Props<T>,
    ref: React.Ref<TextInput>,
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <Controller
        {...formProps}
        render={({ field }) => (
          <View style={styles.container}>
            <View
              style={[
                styles.inputContainer,
                containerStyle,
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
                onChangeText={(text) => {
                  const formattedText = mask ? applyMask(text, mask) : text;
                  field.onChange(formattedText);
                }}
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
) as <T extends FieldValues>(
  props: Props<T> & { ref?: React.Ref<TextInput> },
) => React.ReactElement;

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
