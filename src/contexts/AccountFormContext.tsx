import { createContext, ReactNode, useState } from "react";

export type AccountProps = {
  name?: string;
  cpf?: string;
  birth?: string;
  email?: string;
  phone?: string;
  password?: string;
  cep?: string;
  rua?: string;
  number?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
};

type AccountFormContextDataProps = {
  accountFormData: AccountProps;
  updateFormData: (value: AccountProps) => void;
};

type AccountFormContextProviderProps = {
  children: ReactNode;
};

const AccountFormContext = createContext<AccountFormContextDataProps>(
  {} as AccountFormContextDataProps,
);

function AccountProvider({ children }: AccountFormContextProviderProps) {
  const [accountFormData, setAccountFormData] = useState<AccountProps>(
    {} as AccountProps,
  );

  function updateFormData(data: AccountProps) {
    setAccountFormData((prevState) => ({ ...prevState, ...data }));
  }

  return (
    <AccountFormContext.Provider value={{ accountFormData, updateFormData }}>
      {children}
    </AccountFormContext.Provider>
  );
}

export { AccountProvider, AccountFormContext };
