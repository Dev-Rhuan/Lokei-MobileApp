import { useAccountForm } from "../hooks/useAccountForm";
import { Text, View } from "react-native";

export function Home() {
  const { accountFormData } = useAccountForm();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Nome: {accountFormData.name}</Text>
      <Text>CPF: {accountFormData.cpf}</Text>
      <Text>Data de nascimento: {accountFormData.birth}</Text>
      <Text>E-mail: {accountFormData.email}</Text>
      <Text>Telefone: {accountFormData.phone}</Text>
      <Text>Senha: {accountFormData.password}</Text>
      <Text>CEP: {accountFormData.cep}</Text>
      <Text>Rua: {accountFormData.rua}</Text>
      <Text>Número: {accountFormData.number}</Text>
      <Text>Complemento: {accountFormData.complemento}</Text>
      <Text>Bairro: {accountFormData.bairro}</Text>
      <Text>Cidade: {accountFormData.cidade}</Text>
      <Text>Estado: {accountFormData.estado}</Text>
    </View>
  );
}
