import { Skeleton, Td, Tr } from "@chakra-ui/react";
import { ReactElement } from "react";

type Props = {
  columns: number;
};

export const Loading = ({ columns }: Props): ReactElement => {
  return (
    <Tr>
      {[...Array(columns)].map((x, i) => {
        return (
          <Td key={i}>
            <Skeleton h="16" w="full" />
          </Td>
        );
      })}
    </Tr>
  );
};
