import { WalletService } from "@services/WalletService";
import { paths } from "@utils/paths";
import { ReactElement, useContext } from "react";
import { Navigate } from "react-router-dom";
import { ManagePage } from "./ManagePage/ManagePage";

const Admin = (): ReactElement => {
  const context = useContext(WalletService);
  if (context.status === "auth" && context.wallet.isAdmin) {
    return <ManagePage />;
  }

  return <Navigate to={paths.root} />;
};

export default Admin;
