import { NoWalletDetected } from "@components/NoWalletDetected";
import { ReactElement } from "react";
import AboutPage from "./AboutPage";

const About = (): ReactElement => {
  if (window.ethereum === undefined) {
    return <NoWalletDetected />;
  }

  return <AboutPage />;
};

export default About;
