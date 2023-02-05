import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { ScrollArea } from "@components/ScrollArea/ScrollArea";
import {
  Requests,
  usePaymentRequestService,
} from "@services/PaymentRequestService";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Fragment, ReactElement } from "react";

type Props = {
  data: Requests[];
};

export const VoteTable = ({ data }: Props): ReactElement => {
  const rewardManagerService = usePaymentRequestService();

  const columns: ColumnDef<Requests>[] = [
    { accessorKey: "amount", header: "Reward" },
    { accessorKey: "requestReason", header: "Descripton" },
    // {
    //   accessorKey: "manage",
    //   header: "Manage",
    //   cell: ({ row }) => {
    //     return (
    //       <Received
    //         rewardManagerService={rewardManagerService}
    //         transaction={row.original}
    //       />
    //     );
    //   },
    // },
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
