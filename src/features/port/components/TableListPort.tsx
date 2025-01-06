import { ButtonAction } from "@/components/custom/ButtonAction";
import { TableBodyCustom } from "@/components/custom/TableBodyCustom";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PortResponse } from "../types/portResponse";

type TableListPortProps = {
  isError?: boolean;
  isLoading?: boolean;
  data: PortResponse[];
  onClickUpdate?: (data: PortResponse) => void;
  onClickDelete?: (id: number) => void;
};

export const TableListPort = ({
  data,
  isError,
  isLoading,
  onClickUpdate,
  onClickDelete,
}: TableListPortProps) => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 text-center">No</TableHead>
            <TableHead>Port Name</TableHead>
            <TableHead>Port Code</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBodyCustom
          colSpan={5}
          isError={isError}
          isLoading={isLoading}
          dataLength={data?.length}
        >
          {data?.map((value, index) => (
            <TableRow key={value.id}>
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell>{value.portName}</TableCell>
              <TableCell>{value.portCode}</TableCell>

              <TableCell>
                <ButtonAction
                  onClickUpdate={() => onClickUpdate && onClickUpdate(value)}
                  onClickDelete={() => onClickDelete && onClickDelete(value.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBodyCustom>
      </Table>
    </>
  );
};
