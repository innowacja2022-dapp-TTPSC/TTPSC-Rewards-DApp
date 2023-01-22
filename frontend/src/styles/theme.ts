import { extendTheme } from "@chakra-ui/react";
import { Button } from "./components/Button/Button";

export const rawTheme = {
  components: { Button },
};
export const theme = extendTheme(rawTheme);
