import { Link } from "@chakra-ui/react";
import { ReactElement } from "react";
import { Link as RouterLink } from "react-router-dom";

type Props = {
  children: string;
  path: string;
};

export const AdminLink = ({ path, children }: Props): ReactElement => {
  return (
    <Link
      _active={{
        fontWeight: "700",
      }}
      _disabled={{ color: "gray.500" }}
      _focus={{
        outline: "2px solid",
        outlineOffset: "7px",
        outlineColor: "white",
        boxShadow: "none",
      }}
      _hover={{ color: "gray.400", textDecoration: "none" }}
      as={RouterLink}
      color="white"
      display="inline-block"
      fontSize="md"
      fontWeight="semibold"
      h="fit-content"
      noOfLines={1}
      textAlign="center"
      to={path}
    >
      {children}
    </Link>
  );
};
