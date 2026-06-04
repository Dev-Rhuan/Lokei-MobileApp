import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import { HomeScreen } from "./screens/HomeScreen";
import { CreateAdScreen } from "./screens/CreateAdScreen";
import { SignUpScreen } from "./screens/CriarUsuario/SignUpScreen";
import { SignInScreen } from "./screens/SignInScreen";
import { DetailScreen } from "./screens/DetailsScreen";
import { NavigationContainer, RouteProp } from "@react-navigation/native";

type TScreenDefinitions = {
  home: undefined;
  detail: { id: number };
  signIn: undefined;
  signUp: undefined;
  createAd: undefined;
};

const Stack = createNativeStackNavigator<TScreenDefinitions>();

export const AppRoutes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="detail" component={DetailScreen} />
        <Stack.Screen name="signIn" component={SignInScreen} />
        <Stack.Screen name="signUp" component={SignUpScreen} />
        <Stack.Screen name="createAd" component={CreateAdScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export type TNavigation = NativeStackNavigationProp<TScreenDefinitions>;

export type TRouteProps<T extends keyof TScreenDefinitions> = RouteProp<
  TScreenDefinitions,
  T
>;
