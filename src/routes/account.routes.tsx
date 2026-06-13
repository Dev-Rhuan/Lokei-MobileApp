import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StepOne } from "../screens/CreateUserScreen/SignUpScreenStepOne";
import { StepTwo } from "../screens/CreateUserScreen/SignUpScreenStepTwo";
import { Home } from "../screens/HomeScreen/home";
import { ToolDetails } from "../screens/DetailsScreen/details";
import { CriarAnuncio } from "../screens/CreateAdScreen/criarAnuncio";
import { Login } from "../screens/LoginScreen/index";
import { MinhaConta } from "../screens/AccountScreen/index";

const { Navigator, Screen } = createNativeStackNavigator();

export function AccountRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="login">
      <Screen name="home" component={Home} />
      <Screen name="stepOne" component={StepOne} />
      <Screen name="stepTwo" component={StepTwo} />
      <Screen name="toolDetails" component={ToolDetails} />
      <Screen name="criarAnuncio" component={CriarAnuncio} />
      <Screen name="login" component={Login} />
      <Screen name="minhaConta" component={MinhaConta} />
    </Navigator>
  );
}
