import { createContext, ReactElement, ReactNode, useContext, useMemo } from "react";

export type Token = {
  //The info of the token (i.e. It's Name and symbol)
  name: string;
  symbol: string;
};




export type TokenServiceValue = {

};

export type TokenServiceNullableValue =
  | {
      isInitialized: false;
    }
  | {
      isInitialized: true;
      value: TokenServiceValue;
    };

export const TokenService = createContext<TokenServiceNullableValue>({
  isInitialized: false,
});

export const useTokenService = (): TokenServiceValue => {
  const context = useContext(TokenService);

  if (!context.isInitialized) {
    throw new Error("TokenService not defined");
  }

  return context.value;
};

type Props = {
  children: ReactNode;
};

export const TokenServiceProvider = ({ children }: Props): ReactElement => {
  const value = useMemo<TokenServiceNullableValue>(() => {
    return {
      isInitialized: true,
      value: {
        
      },
    };
  }, []);

  return (
    <TokenService.Provider value={value}>{children}</TokenService.Provider>
  );
};
