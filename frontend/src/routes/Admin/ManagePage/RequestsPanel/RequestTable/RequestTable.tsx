import { Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { ScrollArea } from "@components/ScrollArea/ScrollArea";
import { Requests } from "@services/PaymentManagerService";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ethers } from "ethers";
import { Fragment, ReactElement } from "react";
import { EditRequest } from "./EditRequest/EditRequest";

type Props = {
  data: Requests[];
};

export const RequestTable = ({ data }: Props): ReactElement => {
  const columns: ColumnDef<Requests>[] = [
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => {
        return (
          <Text>
            {parseFloat(ethers.utils.formatEther(row.original.amount))}
          </Text>
        );
      },
    },
    { accessorKey: "requestReason", header: "Request Reason" },
    {
      accessorKey: "status",
      header: "Status",
      cell: () => {
        return <Text>Pending</Text>;
      },
    },
    {
      accessorKey: "manage",
      header: "Manage",
      cell: ({ row }) => {
        return <EditRequest request={row.original} />;
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
