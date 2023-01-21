import { NoWalletDetected } from "@components/NoWalletDetected";
import { ReactElement } from "react";
import ManagePage from "./ManagePage";

const Admin = (): ReactElement => {
  if (window.ethereum === undefined) {
    /* 
    
    Maybe we should check for administrator permissions instead? - suggestion
    
    */
    return <NoWalletDetected />;
  }

  return <ManagePage />;
};

export default Admin;
