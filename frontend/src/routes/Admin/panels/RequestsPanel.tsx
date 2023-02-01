import { Box } from "@chakra-ui/react";
import { ReactElement } from "react";

const RequestsPanel = (): ReactElement => {
  return (
    <>
      <Box style={{ maxHeight: "468px", overflow: "auto" }}>
        Requests
      </Box>
    </>
  );
};

export default RequestsPanel;
