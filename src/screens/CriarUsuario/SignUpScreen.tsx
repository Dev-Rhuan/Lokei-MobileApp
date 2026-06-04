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

  const { control, handleSubmit } = useForm();

  const emailRef = useRef<TextInput>(null);

  return (
    <>
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
            <Input
              icon="user"
              formProps={{
                name: "name",
                control,
              }}
              inputProps={{
                placeholder: "Seu nome completo",
                onSubmitEditing: () => emailRef.current?.focus(),
                returnKeyType: "next",
              }}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>E-mail</Text>
            <Input
              ref={emailRef}
              icon="mail"
              formProps={{
                name: "email",
                control,
              }}
              inputProps={{
                placeholder: "Email",
                onSubmitEditing: () => handleSubmit(handleNextStep),
              }}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Telefone</Text>
            <Input
              icon="phone"
              formProps={{
                name: "phone",
                control,
              }}
              inputProps={{
                placeholder: "(00) 00000-0000",
              }}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Senha</Text>
            <Input
              formProps={{
                name: "password",
                control,
              }}
              inputProps={{
                placeholder: "Senha",
                secureTextEntry: true,
              }}
            />
          </View>

          <View style={{ marginTop: 28 }}>
            <Button
              title="Criar conta"
              onPress={handleSubmit(handleNextStep)}
            />

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
