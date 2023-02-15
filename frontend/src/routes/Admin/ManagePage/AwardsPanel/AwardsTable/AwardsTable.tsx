import { Image, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { ScrollArea } from "@components/ScrollArea/ScrollArea";
import { Awards } from "@services/RewardManagerService";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ethers } from "ethers";
import { Fragment, ReactElement } from "react";
import { EditAward } from "./EditAward/EditAward";

type Props = {
  data: Awards[];
};

export const AwardsTable = ({ data }: Props): ReactElement => {
  const columns: ColumnDef<Awards>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "inStock", header: "Amount" },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        return (
          <Text>
            {parseFloat(ethers.utils.formatEther(row.original.price))}
          </Text>
        );
      },
    },
    {
      accessorKey: "imgHash",
      header: "Image",
      cell: ({ row }) => {
        return (
          <Image borderRadius="md" h="20" src={row.original.imgHash} w="20" />
        );
      },
    },
    {
      accessorKey: "manage",
      header: "Manage",
      cell: ({ row }) => {
        return <EditAward award={row.original} />;
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
