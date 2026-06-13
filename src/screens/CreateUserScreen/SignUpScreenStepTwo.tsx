import { useRef } from "react";
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";

import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { styles } from "./styles";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { useAccountForm } from "../../hooks/useAccountForm";
import { AccountProps } from "../../contexts/AccountFormContext";
import { Progress } from "../../components/Progress";
import { BackButton } from "../../components/BackButton";
import { supabase } from "../../services/supabase";

export const StepTwo = () => {
  const insets = useSafeAreaInsets();
  const { accountFormData, updateFormData } = useAccountForm();
  const { navigate } = useNavigation();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AccountProps>();

  const passwordRef = useRef<TextInput>(null);
  const passwordConfirmRef = useRef<TextInput>(null);

  const password = watch("password");

  async function handleNextStep(data: AccountProps) {
    try {
      updateFormData(data);

      const usuarioCompleto = { ...accountFormData, ...data };

      const { data: authData, error: signUpError } = await supabase.auth.signUp(
        {
          email: usuarioCompleto.email!,
          password: usuarioCompleto.password!,
        },
      );

      if (signUpError) throw signUpError;

      const user = authData.user;

      const { error: insertError } = await supabase.from("usuario").insert({
        id: user!.id,
        name: usuarioCompleto.name,
        cpf: usuarioCompleto.cpf,
        birth: usuarioCompleto.birth,
        email: usuarioCompleto.email,
      });

      if (insertError) throw insertError;

      navigate("home");
    } catch (error: any) {
      if (error.message?.includes("already registered")) {
        Alert.alert("Erro", "Este e-mail já está cadastrado.");
      } else if (error.message?.includes("weak")) {
        Alert.alert("Erro", "A senha precisa ter pelo menos 8 caracteres.");
      } else {
        Alert.alert(
          "Erro",
          "Não foi possível criar a conta. Verifique sua conexão e tente novamente.",
        );
      }
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
          <View style={styles.progress}>
            <View style={{ position: "absolute", left: 0 }}>
              <BackButton />
            </View>
            <Progress currentStep={2} totalSteps={2} />
          </View>

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
                  onSubmitEditing: () => passwordRef.current?.focus(),
                }}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Senha</Text>
              <Input
                ref={passwordRef}
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
                  secureTextEntry: true,
                  onSubmitEditing: () => passwordConfirmRef.current?.focus(),
                }}
              />
            </View>
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Confirmar Senha</Text>
            <Input
              ref={passwordConfirmRef}
              icon="lock"
              error={errors.passwordConfirm?.message}
              formProps={{
                name: "passwordConfirm",
                control,
                rules: {
                  required: "Confirmação de senha é obrigatória.",
                  validate: (value) =>
                    value === password || "As senhas não coincidem",
                },
              }}
              inputProps={{
                placeholder: "Confirmar senha",
                secureTextEntry: true,
                returnKeyType: "send",
                onSubmitEditing: handleSubmit(handleNextStep),
              }}
            />
          </View>
          <View style={{ flex: 1 }} />

          <View style={styles.footer}>
            <Button
              title="Criar conta"
              onPress={handleSubmit(handleNextStep)}
            />
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};
