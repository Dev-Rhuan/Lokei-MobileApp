import { useRef, useState } from "react";
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  TextInput,
  Platform,
  Pressable,
} from "react-native";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";

import { styles } from "./styles";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { Progress } from "../../components/Progress";
import { BackButton } from "../../components/BackButton";
import { AccountProps } from "../../contexts/AccountFormContext";
import { useAccountForm } from "../../hooks/useAccountForm";

export const StepOne = () => {
  const insets = useSafeAreaInsets();
  const { navigate } = useNavigation();
  const { updateFormData } = useAccountForm();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AccountProps>();

  const cpfRef = useRef<TextInput>(null);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateObj, setDateObj] = useState(new Date());

  const birthValue = watch("birth");

  function onChangeDate(event: any, selectedDate?: Date) {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }

    if (event.type === "set" && selectedDate) {
      setDateObj(selectedDate);

      const day = String(selectedDate.getDate()).padStart(2, "0");
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const year = selectedDate.getFullYear();

      setValue("birth", `${day}/${month}/${year}`, { shouldValidate: true });
    } else if (event.type === "dismissed") {
      setShowDatePicker(false);
    }
  }

  function handleNextStep(data: AccountProps) {
    updateFormData(data);
    navigate("stepTwo");
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.container,
            {
              paddingTop: insets.top + 16,
              paddingBottom: insets.bottom + 8,
            },
          ]}
        >
          <View>
            <View style={styles.progress}>
              <View style={{ position: "absolute", left: 0 }}>
                <BackButton />
              </View>
              <Progress currentStep={1} totalSteps={2} />
            </View>

            <View style={styles.header}>
              <Text style={styles.title}>Vamos começar</Text>
              <Text style={styles.subtitle}>
                Primeiro, conte um pouco sobre você. Essas informações ficam
                protegidas.
              </Text>
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Nome completo</Text>
              <Input
                icon="user"
                error={errors.name?.message}
                formProps={{
                  control,
                  name: "name",
                  rules: { required: "Nome é obrigatório." },
                }}
                inputProps={{
                  placeholder: "Seu nome completo",
                  returnKeyType: "next",
                  onSubmitEditing: () => cpfRef.current?.focus(),
                }}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>CPF</Text>
              <Input
                ref={cpfRef}
                icon="credit-card"
                mask="cpf"
                error={errors.cpf?.message}
                formProps={{
                  name: "cpf",
                  control,
                  rules: {
                    required: "CPF é obrigatório.",
                    pattern: {
                      value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                      message: "CPF inválido",
                    },
                  },
                }}
                inputProps={{
                  placeholder: "123.456.789-00",
                  keyboardType: "number-pad",
                  returnKeyType: "next",
                }}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Data de nascimento</Text>
              <Pressable onPress={() => setShowDatePicker(true)}>
                <View pointerEvents="none">
                  <Input
                    icon="calendar"
                    error={errors.birth?.message}
                    formProps={{
                      name: "birth",
                      control,
                      rules: {
                        required: "Data de nascimento é obrigatório.",
                        pattern: {
                          value:
                            /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
                          message: "Data de nascimento inválida",
                        },
                      },
                    }}
                    inputProps={{
                      placeholder: "DD/MM/AAAA",
                      editable: false,
                      value: birthValue,
                    }}
                  />
                </View>
              </Pressable>
            </View>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={dateObj}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "calendar"}
              maximumDate={new Date()}
              onChange={onChangeDate}
            />
          )}

          <View style={{ flex: 1 }} />

          <View style={styles.footer}>
            <Button title="Continuar" onPress={handleSubmit(handleNextStep)} />
            <Text style={styles.footerText}>
              Já tem uma conta? <Text style={styles.linkText}>Entrar</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};
