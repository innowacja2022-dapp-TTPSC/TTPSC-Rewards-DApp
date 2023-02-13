import { Flex, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
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
import { VoteButton } from "./VoteButton/VoteButton";

type Props = {
  data: Requests[];
};

export const VoteTable = ({ data }: Props): ReactElement => {
  const paymentManagerSerivce = usePaymentRequestService();

  const columns: ColumnDef<Requests>[] = [
    { accessorKey: "amount", header: "Reward" },
    { accessorKey: "requestReason", header: "Description" },
    {
      accessorKey: "vote",
      header: "Vote",
      cell: ({ row }) => {
        return <VoteButton paymentRequestService={paymentManagerSerivce} />;
      },
    },
  ];
  const { getHeaderGroups, getRowModel } = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <Flex
      alignItems="center"
      h="calc(100% - 80px)"
      justifyContent="center"
      px="10"
      py="10"
    >
      <Flex
        alignItems="center"
        borderColor="purple.500"
        borderRadius="xl"
        borderWidth="medium"
        h="full"
        justifyContent="center"
        p="4"
      >
        <ScrollArea thumbColor="purple.500">
          <Table variant="simple">
            <Thead>
              {getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id} w="full">
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
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Td>
                    ))}
                  </Tr>
                </Fragment>
              ))}
            </Tbody>
          </Table>
        </ScrollArea>
      </Flex>
    </Flex>
  );
};
