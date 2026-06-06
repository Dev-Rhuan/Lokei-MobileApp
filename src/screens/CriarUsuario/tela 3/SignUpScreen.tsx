import { View, Text, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useForm } from "react-hook-form";

import { styles } from "../tela 3/styles";

import { Input } from "../../../components/input";
import { Button } from "../../../components/button";
import { useAccountForm } from "../../../hooks/useAccountForm";
import { AccountProps } from "../../../contexts/AccountFormContext";
import { useNavigation } from "@react-navigation/native";
import { Progress } from "../../../components/Progress";

export const StepThree = () => {
  const { updateFormData } = useAccountForm();
  const { navigate } = useNavigation();
  function handleNextStep(data: AccountProps) {
    updateFormData(data);
    navigate("home");
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountProps>();

  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Progress currentStep={3} totalSteps={3} />

          <View style={styles.header}>
            <Text style={styles.title}>Seu endereço</Text>
            <Text style={styles.subtitle}>
              Usamos para mostrar ferramentas perto de você. Só o bairro é
              exibido publicamente.
            </Text>
          </View>

          <View>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>CEP</Text>
              <Input
                icon="map-pin"
                error={errors.cep?.message}
                formProps={{
                  name: "cep",
                  control,
                  rules: {
                    required: "CEP é obrigatório.",
                    pattern: {
                      value: /^\d{5}-\d{3}$/,
                      message: "cep inválido",
                    },
                  },
                }}
                inputProps={{
                  placeholder: "00000-000",
                  returnKeyType: "next",
                }}
              />
            </View>

            <View style={styles.inputWrapper}>
              <View>
                <Text style={styles.label}>Rua</Text>
                <Input
                  icon="home"
                  error={errors.cep?.message}
                  formProps={{
                    name: "rua",
                    control,
                    rules: {
                      required: "Rua é obrigatório.",
                    },
                  }}
                  inputProps={{
                    placeholder: "digite o logradouro",
                    returnKeyType: "next",
                  }}
                />
              </View>
              <View>
                <Text style={styles.label}>Número</Text>
                <Input
                  icon="hash"
                  error={errors.number?.message}
                  formProps={{
                    name: "number",
                    control,
                    rules: {
                      required: "Numero é obrigatório.",
                    },
                  }}
                  inputProps={{
                    returnKeyType: "next",
                  }}
                />
              </View>
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Complemento (opcional)</Text>
              <Input
                formProps={{
                  name: "complemento",
                  control,
                }}
                inputProps={{
                  placeholder: "Apto, bloco, referência",
                  returnKeyType: "next",
                }}
              />
            </View>

            <View style={styles.inputWrapper}>
              <View>
                <Text style={styles.label}>Bairro</Text>
                <Input
                  icon="map-pin"
                  error={errors.bairro?.message}
                  formProps={{
                    name: "bairro",
                    control,
                    rules: {
                      required: "Bairro é obrigatório.",
                    },
                  }}
                  inputProps={{
                    returnKeyType: "next",
                  }}
                />
              </View>
              <View>
                <Text style={styles.label}>Estado</Text>
                <Input
                  error={errors.estado?.message}
                  formProps={{
                    name: "estado",
                    control,
                    rules: {
                      required: "Estado é obrigatório.",
                    },
                  }}
                />
              </View>
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Cidade</Text>
              <Input
                icon="home"
                error={errors.cidade?.message}
                formProps={{
                  name: "cidade",
                  control,
                  rules: {
                    required: "Cidade é obrigatório.",
                  },
                }}
                inputProps={{
                  placeholder: "Seu nome completo",
                  returnKeyType: "next",
                }}
              />
            </View>
          </View>

          <View style={styles.footer}>
            <Button
              title="Criar conta"
              onPress={handleSubmit(handleNextStep)}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};
