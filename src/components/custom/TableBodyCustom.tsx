import noData from "@/assets/no-data.svg";
import waiting from "@/assets/waiting.svg";
import { Loader2 } from "lucide-react";
import { TableBody, TableCell, TableRow } from "../ui/table";

type TableBodyCustomProps = {
  isError?: boolean;
  errorMessage?: string;
  isLoading?: boolean;
  dataLength?: number;
  children?: React.ReactNode;
  colSpan?: number;
};

export const TableBodyCustom = ({
  isError,
  isLoading,
  dataLength,
  children,
  colSpan,
}: TableBodyCustomProps) => {
  return (
    <TableBody>
      {isError && !isLoading && (
        <TableRow>
          <TableCell colSpan={colSpan}>
            <div className="flex flex-col items-center">
              <img src={noData} alt="No Data" className="w-1/5" />
              <p className="text-xl">Something went wrong</p>
            </div>
          </TableCell>
        </TableRow>
      )}

      {isLoading && (
        <TableRow>
          <TableCell colSpan={colSpan}>
            <div className="flex flex-col items-center">
              <img src={waiting} alt="No Data" className="w-1/5" />
              <div className="flex gap-3 items-center">
                <Loader2 className="animate-spin" />
                <p className="text-xl">Loading...</p>
              </div>
            </div>
          </TableCell>
        </TableRow>
      )}

      {!isLoading && !isError && dataLength === 0 && (
        <TableRow>
          <TableCell colSpan={colSpan}>
            <div className="flex flex-col items-center">
              <img src={noData} alt="No Data" className="w-1/5" />
              <p className="text-xl">Data Not Found</p>
            </div>
          </TableCell>
        </TableRow>
      )}

      {!isLoading && !isError && <>{children}</>}
    </TableBody>
  );
};
