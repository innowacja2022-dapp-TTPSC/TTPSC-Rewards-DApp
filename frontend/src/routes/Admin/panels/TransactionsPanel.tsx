import { Box } from "@chakra-ui/react";
import { ReactElement } from "react";

const TransactionsPanel = (): ReactElement => {
  return (
    <>
      <Box style={{ maxHeight: "468px", overflow: "auto" }}>
        Transactions
      </Box>
    </>
  );
};

export default TransactionsPanel;
