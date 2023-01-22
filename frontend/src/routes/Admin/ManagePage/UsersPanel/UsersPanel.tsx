import { Box } from "@chakra-ui/react";
import { ReactElement } from "react";

const UsersPanel = (): ReactElement => {
  return (
    <>
      <Box style={{ maxHeight: "468px", overflow: "auto" }}>Users</Box>
    </>
  );
};

export default UsersPanel;
