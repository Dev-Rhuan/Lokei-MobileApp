import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StepOne } from "../screens/CriarUsuario/tela 1/SignUpScreen";
import { StepTwo } from "../screens/CriarUsuario/tela 2/SignUpScreen";
import { StepThree } from "../screens/CriarUsuario/tela 3/SignUpScreen";
import { Home } from "../screens/home";

const { Navigator, Screen } = createNativeStackNavigator();

export function AccountRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="stepOne" component={StepOne} />
      <Screen name="stepTwo" component={StepTwo} />
      <Screen name="stepThree" component={StepThree} />
      <Screen name="home" component={Home} />
    </Navigator>
  );
}
