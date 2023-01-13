import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Router } from "@routes/Router";
import { WalletServiceProvider } from "@services/WalletService";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactElement, useState } from "react";

const theme = extendTheme();

const App = (): ReactElement => {
  const [client] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={client}>
      <ChakraProvider theme={theme}>
        <WalletServiceProvider>
          <Router />
        </WalletServiceProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default App;
