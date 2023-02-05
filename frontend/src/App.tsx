import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Router } from "@routes/Router";
import { PaymentRequestServiceProvider } from "@services/PaymentRequestService";
import { RewardManagerServiceProvider } from "@services/RewardManagerService";
import { WalletServiceProvider } from "@services/WalletService";
import { rawTheme } from "@styles/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactElement, useState } from "react";

const theme = extendTheme(rawTheme);

const App = (): ReactElement => {
  const [client] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={client}>
      <ChakraProvider theme={theme}>
        <WalletServiceProvider>
          <PaymentRequestServiceProvider>
            <RewardManagerServiceProvider>
              <Router />
            </RewardManagerServiceProvider>
          </PaymentRequestServiceProvider>
        </WalletServiceProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default App;
