import { Center, Heading } from "@chakra-ui/react";
import { Loading } from "@components/Loading";
import { NoWalletDetected } from "@components/NoWalletDetected";
import { useWalletService } from "@services/WalletService";
import { ReactElement } from "react";
import AboutPage from "./AboutPage";

const About = (): ReactElement => {
  const status = useWalletService();

  if (window.ethereum === undefined) {
    return <NoWalletDetected />;
  }
  if (status === "loading") {
    return <Loading />;
  }
  return <AboutPage />;
};

export default About;
