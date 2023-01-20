import { Box } from "@chakra-ui/react";
import { NoWalletDetected } from "@components/NoWalletDetected";
import { ReactElement } from "react";

const Admin = (): ReactElement => {
  if (window.ethereum === undefined) {
    return <NoWalletDetected />;
  }
  return <Box>Admin</Box>;
};

export default Admin;
