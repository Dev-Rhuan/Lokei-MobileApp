import { AccountProvider } from "./contexts/AccountFormContext";
import { Routes } from "./routes/routes";

export default function App() {
  return (
    <AccountProvider>
      <Routes />
    </AccountProvider>
  );
}
