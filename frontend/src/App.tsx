import { ChakraProvider } from "@chakra-ui/react";
import { Router } from "@routes/Router";
import { ReactElement } from "react";

const App = (): ReactElement => {
  return (
    <ChakraProvider     >
      <Router />
    </ChakraProvider>
  );
};

export default App;
