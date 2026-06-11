
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AccountProvider } from "./contexts/AccountFormContext";
import { Routes } from "./routes/routes";

export default function App() {
  return (
    <SafeAreaProvider>
      <AccountProvider>
        <Routes />
      </AccountProvider>
    </SafeAreaProvider>
  );
}
