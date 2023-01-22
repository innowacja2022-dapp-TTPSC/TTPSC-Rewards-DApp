import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { ReactElement } from "react";
import { Loading } from "./Loading/Loading";

export const tableHead = {
  transactionsHead: ["From", "Reward", "Quantity", "Manage"],
  requestsHead: ["From", "Amount", "Status", "Manage"],
  wwardsHead: ["Name", "Amount", "Price", "Manage"],
  usersHead: ["Addres", "Role"],
};

type Props = {
  columns: number;
  tableHead: string[];
};

export const TableLoading = ({ columns, tableHead }: Props): ReactElement => {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          {tableHead.map((head, i) => {
            return (
              <Th fontSize="md" key={i}>
                {head}
              </Th>
            );
          })}
        </Tr>
      </Thead>
      <Tbody>
        {[...Array(6)].map((x, i) => {
          return <Loading columns={columns} key={i} />;
        })}
      </Tbody>
    </Table>
  );
};
