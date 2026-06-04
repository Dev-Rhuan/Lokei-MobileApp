import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

export const SignUpScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");

  const [focusedInput, setFocusedInput] = useState("");

  const ACCENT = "#F97316";

  const handlePhoneChange = (text: string) => {
    let formatted = text.replace(/\D/g, "");
    formatted = formatted.replace(/^(\d{2})(\d)/g, "($1) $2");
    formatted = formatted.replace(/(\d{5})(\d)/, "$1-$2");

    setNumber(formatted);
  };

  return (
    <>
      <StatusBar style="dark" hidden={true} />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Crie sua conta</Text>
            <Text style={styles.subtitle}>
              Crie sua conta para começar a usar o app
            </Text>
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Nome completo</Text>
            <View
              style={[
                styles.inputContainer,
                { borderColor: focusedInput === "name" ? ACCENT : "#E5E5E5" },
              ]}
            >
              <TextInput
                style={styles.textInput}
                placeholder="Seu nome completo"
                placeholderTextColor="#A3A3A3"
                value={name}
                onChangeText={setName}
                onFocus={() => setFocusedInput("name")}
                onBlur={() => setFocusedInput("")}
              />
            </View>
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>E-mail</Text>
            <View
              style={[
                styles.inputContainer,
                { borderColor: focusedInput === "email" ? ACCENT : "#E5E5E5" },
              ]}
            >
              <TextInput
                style={styles.textInput}
                placeholder="seu@email.com"
                placeholderTextColor="#A3A3A3"
                value={email}
                onChangeText={setEmail}
                onFocus={() => setFocusedInput("email")}
                onBlur={() => setFocusedInput("")}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Telefone</Text>
            <View
              style={[
                styles.inputContainer,
                { borderColor: focusedInput === "number" ? ACCENT : "#E5E5E5" },
              ]}
            >
              <TextInput
                style={styles.textInput}
                placeholder="(00) 00000-0000"
                placeholderTextColor="#A3A3A3"
                value={number}
                onChangeText={handlePhoneChange}
                maxLength={15}
                onFocus={() => setFocusedInput("number")}
                onBlur={() => setFocusedInput("")}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Senha</Text>
            <View
              style={[
                styles.inputContainer,
                {
                  borderColor: focusedInput === "password" ? ACCENT : "#E5E5E5",
                },
              ]}
            >
              <TextInput
                style={styles.textInput}
                placeholder="Sua senha secreta"
                placeholderTextColor="#A3A3A3"
                value={password}
                onChangeText={setPassword}
                onFocus={() => setFocusedInput("password")}
                onBlur={() => setFocusedInput("")}
                secureTextEntry
              />
            </View>
          </View>

          <View style={{ marginTop: 28 }}>
            <TouchableOpacity style={styles.button} activeOpacity={0.8}>
              <Text style={styles.buttonText}>Criar conta</Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>
              Já tem uma conta?{" "}
              <Text style={styles.linkText} onPress={() => {}}>
                Entrar
              </Text>
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FAFAFA",
    padding: 24,
  },
  header: {
    marginBottom: 8,
  },
  title: {
    fontSize: 26,
    color: "#171717",
    fontWeight: "700",
    letterSpacing: -0.52,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 13,
    color: "#737373",
    marginTop: 8,
    lineHeight: 18,
    maxWidth: 280,
  },
  inputWrapper: {
    marginTop: 20,
  },
  label: {
    fontSize: 11,
    color: "#737373",
    marginLeft: 4,
    fontWeight: "600",
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    height: 52,
    borderRadius: 20,
    borderWidth: 1.5,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: "#171717",
    height: "100%",
  },
  button: {
    width: "100%",
    height: 56,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F97316",
    shadowColor: "#F97316",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  footerText: {
    marginTop: 20,
    textAlign: "center",
    color: "#737373",
    fontWeight: "400",
  },
  linkText: {
    color: "#F97316",
    fontWeight: "700",
  },
});
