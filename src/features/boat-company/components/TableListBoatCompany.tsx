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
import { BoatCompanyResponse } from "../types/boatCompanyResponse";

type TableListBoatCompanyProps = {
  isError?: boolean;
  isLoading?: boolean;
  data: BoatCompanyResponse[];
  onClickUpdate?: (data: BoatCompanyResponse) => void;
  onClickDelete?: (id: number) => void;
};

export const TableListBoatCompany = ({
  data,
  isError,
  isLoading,
  onClickUpdate,
  onClickDelete,
}: TableListBoatCompanyProps) => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 text-center">No</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Image</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBodyCustom
          colSpan={4}
          isError={isError}
          isLoading={isLoading}
          dataLength={data?.length}
        >
          {data?.map((value, index) => (
            <TableRow key={value.id}>
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell width={400}>{value.companyName}</TableCell>
              <TableCell>
                {value.companyLogo ? (
                  <img
                    src={`http://localhost:3000/${value.companyLogo}`}
                    alt="Company Logo"
                    width={50}
                  />
                ) : (
                  <img src={image} alt="Company Logo" width={50} />
                )}
              </TableCell>

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
