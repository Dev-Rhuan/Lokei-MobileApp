import { useRef } from "react";
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import { styles } from "../tela 1/styles";

import { Input } from "../../../components/input";
import { Button } from "../../../components/button";
import { AccountProps } from "../../../contexts/AccountFormContext";
import { useAccountForm } from "../../../hooks/useAccountForm";
import { Progress } from "../../../components/Progress";
import { BackButton } from "../../../components/BackButton";

export const StepOne = () => {
  const { updateFormData } = useAccountForm();
  const { navigate } = useNavigation();

  function handleNextStep(data: AccountProps) {
    updateFormData(data);
    navigate("stepTwo");
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountProps>();

  const cpfRef = useRef<TextInput>(null);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View>
            <BackButton />
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Progress currentStep={1} totalSteps={3} />
            </View>
          </View>
          <View>
            <View style={styles.header}>
              <Text style={styles.title}>Vamos começar 👋</Text>
              <Text style={styles.subtitle}>
                Primeiro, conte um pouco sobre você. Essas informações ficam
                protegidas.
              </Text>
            </View>

            <View>
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Nome completo</Text>
                <Input
                  icon="user"
                  error={errors.name?.message}
                  formProps={{
                    control,
                    name: "name",
                    rules: {
                      required: "Nome é obrigatório.",
                    },
                  }}
                  inputProps={{
                    placeholder: "Seu nome completo",
                    returnKeyType: "next",
                  }}
                />
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.label}>CPF</Text>
                <Input
                  icon="credit-card"
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
                    onSubmitEditing: () => cpfRef.current?.focus(),
                    returnKeyType: "next",
                  }}
                />
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Data de nascimento</Text>
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
                    onSubmitEditing: handleSubmit(handleNextStep),
                    returnKeyType: "next",
                  }}
                />
              </View>
            </View>
          </View>

          <View style={styles.footer}>
            <Button title="Continuar" onPress={handleSubmit(handleNextStep)} />
            <Text style={styles.footerText}>
              Já tem uma conta? <Text style={styles.linkText}>Entrar</Text>
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};
