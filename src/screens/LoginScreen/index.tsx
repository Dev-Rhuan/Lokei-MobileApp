import { useRef, useState } from "react";
import {
  View,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import { useForm } from "react-hook-form";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Input } from "../../components/input";
import { styles } from "./styles";
import { Button } from "../../components/button";
import { supabase } from "../../services/supabase";

type LoginProps = {
  email: string;
  password: string;
};

export const Login = () => {
  const insets = useSafeAreaInsets();
  const { navigate } = useNavigation();
  const passwordRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>();

  async function handleLogin(data: LoginProps) {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      if (error.message.toLowerCase().includes("invalid")) {
        Alert.alert("Erro", "E-mail ou senha incorretos.");
      } else {
        Alert.alert("Erro", "Não foi possível entrar. Tente novamente.");
      }
      return;
    }

    navigate("home" as never);
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#FAFAFA" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
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
                paddingTop: insets.top + 24,
                paddingBottom: insets.bottom + 24,
              },
            ]}
          >
            <View style={styles.header}>
              <Text style={styles.title}>Bem-vindo de volta</Text>
              <Text style={styles.subtitle}>
                Entre para alugar e anunciar ferramentas perto de você.
              </Text>
            </View>

            {/* Inputs */}
            <View style={styles.form}>
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Email</Text>
                <Input
                  icon="mail"
                  error={errors.email?.message}
                  formProps={{
                    control,
                    name: "email",
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
                    keyboardType: "email-address",
                    autoCapitalize: "none",
                    returnKeyType: "next",
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
                    control,
                    name: "password",
                    rules: { required: "Senha é obrigatória." },
                  }}
                  inputProps={{
                    placeholder: "Sua senha",
                    secureTextEntry: !showPassword,
                    returnKeyType: "done",
                    onSubmitEditing: handleSubmit(handleLogin),
                  }}
                />
              </View>
            </View>

            {/* Botão entrar */}
            <Button title="Entrar" onPress={handleSubmit(handleLogin)} />

            <View style={{ flex: 1 }} />

            {/* Footer */}
            <Text style={styles.footerText}>
              Ainda não tem conta?{" "}
              <Text
                style={styles.linkText}
                onPress={() => navigate("stepOne" as never)}
              >
                Criar agora
              </Text>
            </Text>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
