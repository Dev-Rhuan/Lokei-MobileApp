import { useState, useRef } from "react";
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { useForm } from "react-hook-form";

import { styles } from "./styles";

import { Input } from "../../components/input";
import { Button } from "../../components/button";

import { auth } from "../../services/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const SignUpScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");

  function handleNextStep(data: any) {
    console.log(data);
  }

  const signUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      console.log(userCredential.user);
    } catch (error: any) {
      console.log(error);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const emailRef = useRef<TextInput>(null);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
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
                  name: "name",
                  control,
                  rules: {
                    required: "Nome é obrigatório.",
                  },
                }}
                inputProps={{
                  placeholder: "Seu nome completo",
                  onSubmitEditing: () => emailRef.current?.focus(),
                  returnKeyType: "next",
                }}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>CPF</Text>
              <Input
                icon="credit-card"
                error={errors.name?.message}
                formProps={{
                  name: "cpf",
                  control,
                  rules: {
                    required: "CPF é obrigatório.",
                  },
                }}
                inputProps={{
                  placeholder: "123.456.789-00",
                  onSubmitEditing: () => emailRef.current?.focus(),
                  returnKeyType: "next",
                }}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Data de nascimento</Text>
              <Input
                icon="calendar"
                error={errors.name?.message}
                formProps={{
                  name: "data",
                  control,
                  rules: {
                    required: "Data de nascimento é obrigatório.",
                  },
                }}
                inputProps={{
                  placeholder: "DD/MM/AAAA",
                  onSubmitEditing: () => emailRef.current?.focus(),
                  returnKeyType: "next",
                }}
              />
            </View>
          </View>

          <View style={styles.footer}>
            <Button title="Continuar" onPress={handleSubmit(handleNextStep)} />
            <Text style={styles.footerText}>
              Já tem uma conta?{" "}
              <Text
                style={styles.linkText}
                onPress={() => navigation.navigate("signIn")}
              >
                Entrar
              </Text>
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};
