import image from "@/assets/image.svg";
import { ButtonAction } from "@/components/custom/ButtonAction";
import { TableBodyCustom } from "@/components/custom/TableBodyCustom";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BoatResponse } from "../types/boatResponse";

type TableListBoatProps = {
  isError?: boolean;
  isLoading?: boolean;
  data: BoatResponse[];
  onClickUpdate?: (data: BoatResponse) => void;
  onClickDelete?: (id: number) => void;
};

export const TableListBoat = ({
  data,
  isError,
  isLoading,
  onClickUpdate,
  onClickDelete,
}: TableListBoatProps) => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 text-center">No</TableHead>
            <TableHead>Boat Name</TableHead>
            <TableHead>Boat Image</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Action</TableHead>
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
              <TableCell>{value.boatName}</TableCell>
              {value.boatImage ? (
                <img
                  src={`http://localhost:3000/${value.boatImage}`}
                  alt="Boat Image"
                  width={50}
                />
              ) : (
                <img src={image} alt="Boat Image" width={50} />
              )}
              <TableCell>{value.boatCompany?.companyName}</TableCell>
              <TableCell>{value.capacity}</TableCell>

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
