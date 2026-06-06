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

import { styles } from "../tela 2/styles";

import { Input } from "../../../components/input";
import { Button } from "../../../components/button";
import { useAccountForm } from "../../../hooks/useAccountForm";
import { AccountProps } from "../../../contexts/AccountFormContext";
import { Progress } from "../../../components/Progress";

export const StepTwo = () => {
  const { updateFormData } = useAccountForm();
  const { navigate } = useNavigation();

  function handleNextStep(data: AccountProps) {
    updateFormData(data);
    navigate("stepThree");
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountProps>();

  const phoneRef = useRef<TextInput>(null);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Progress currentStep={2} totalSteps={3} />

          <View style={styles.header}>
            <Text style={styles.title}>Acesso e contato</Text>
            <Text style={styles.subtitle}>
              Como podemos falar com você e proteger sua conta.
            </Text>
          </View>

          <View>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Email</Text>
              <Input
                icon="mail"
                error={errors.email?.message}
                formProps={{
                  name: "email",
                  control,
                  rules: {
                    required: "E-mail é obrigatório.",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "E-mail inválido",
                    },
                  },
                }}
                inputProps={{
                  placeholder: "seuemail@email.com",
                  returnKeyType: "next",
                }}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Telefone celular</Text>
              <Input
                icon="phone"
                error={errors.phone?.message}
                formProps={{
                  name: "phone",
                  control,
                  rules: {
                    required: "Telefone é obrigatório.",
                    pattern: {
                      value: /^\(\d{2}\)\s9\d{4}-\d{4}$/,
                      message: "Telefone inválido",
                    },
                  },
                }}
                inputProps={{
                  placeholder: "(00) 00000-0000",
                  onSubmitEditing: () => phoneRef.current?.focus(),
                  returnKeyType: "next",
                }}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Senha</Text>
              <Input
                icon="lock"
                error={errors.password?.message}
                formProps={{
                  name: "password",
                  control,
                  rules: {
                    required: "Senha é obrigatória.",
                    pattern: {
                      value: /^.{8,}$/,
                      message: "A senha deve ter pelo menos 8 caracteres",
                    },
                  },
                }}
                inputProps={{
                  placeholder: "Senha",
                  onSubmitEditing: handleSubmit(handleNextStep),
                  secureTextEntry: true,
                }}
              />
            </View>
          </View>

          <View style={styles.footer}>
            <Button title="Continuar" onPress={handleSubmit(handleNextStep)} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};
