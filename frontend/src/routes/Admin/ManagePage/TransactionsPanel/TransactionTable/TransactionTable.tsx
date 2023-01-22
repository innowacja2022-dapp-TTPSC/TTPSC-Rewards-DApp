import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { ScrollArea } from "@components/ScrollArea/ScrollArea";
import {
  Transactions,
  useRewardManagerService,
} from "@services/RewardManagerService";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Fragment, ReactElement } from "react";
import { Received } from "./Received/Received";

type Props = {
  data: Transactions[];
};

export const TransactionTable = ({ data }: Props): ReactElement => {
  const rewardManagerService = useRewardManagerService();

  const columns: ColumnDef<Transactions>[] = [
    { accessorKey: "address", header: "From" },
    { accessorKey: "reward", header: "Reward" },
    { accessorKey: "quantity", header: "Quantity" },
    {
      accessorKey: "manage",
      header: "Manage",
      cell: ({ row }) => {
        return (
          <Received
            rewardManagerService={rewardManagerService}
            transaction={row.original}
          />
        );
      },
    },
  ];
  const { getHeaderGroups, getRowModel } = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <ScrollArea thumbColor="purple.500">
      <Table variant="simple">
        <Thead>
          {getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th fontSize="md" key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {getRowModel().rows.map((row) => (
            <Fragment key={row.id}>
              <Tr>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            </Fragment>
          ))}
        </Tbody>
      </Table>
    </ScrollArea>
  );
};
