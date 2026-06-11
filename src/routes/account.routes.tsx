import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StepOne } from "../screens/CriarUsuario/SignUpScreenStepOne";
import { StepTwo } from "../screens/CriarUsuario/SignUpScreenStepTwo";
import { Home } from "../screens/home";
import { ToolDetails } from "../screens/DetalhesFerramenta/details";
import { CriarAnuncio } from "../screens/CriarAnuncio/criarAnuncio";

const { Navigator, Screen } = createNativeStackNavigator();

export function AccountRoutes() {
  return (
    <Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="criarAnuncio"
    >
      <Screen name="home" component={Home} />
      <Screen name="stepOne" component={StepOne} />
      <Screen name="stepTwo" component={StepTwo} />
      <Screen name="toolDetails" component={ToolDetails} />
      <Screen name="criarAnuncio" component={CriarAnuncio} />
    </Navigator>
  );
}
