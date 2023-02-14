import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { ScrollArea } from "@components/ScrollArea/ScrollArea";
import {
  Awards,
  useRewardManagerService,
} from "@services/RewardManagerService";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Fragment, ReactElement } from "react";
import { ManageAward } from "./ManageAward/ManageAward";

type Props = {
  data: Awards[];
};

export const AwardsTable = ({ data }: Props): ReactElement => {
  const rewardManagerService = useRewardManagerService();

  const columns: ColumnDef<Awards>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "amount", header: "Amount" },
    { accessorKey: "price", header: "Price" },
    { accessorKey: "image", header: "Image" },
    {
      accessorKey: "manage",
      header: "Manage",
      cell: ({ row }) => {
        return <ManageAward award={row.original} />;
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
