import { ButtonAction } from "@/components/custom/ButtonAction";
import { TableBodyCustom } from "@/components/custom/TableBodyCustom";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScheduleResponse } from "../types/scheduleResponse";
import { formatDate } from "date-fns";
import { idrConverter } from "@/utilities/idrConverter";
import { useAuth } from "@/features/auth/contexts/useAuth";

type TableListScheduleProps = {
  isError?: boolean;
  isLoading?: boolean;
  data: ScheduleResponse[];
  onClickUpdate?: (data: ScheduleResponse) => void;
  onClickDelete?: (id: number) => void;
};

export const TableListSchedule = ({
  data,
  isError,
  isLoading,
  onClickUpdate,
  onClickDelete,
}: TableListScheduleProps) => {
  const { authState } = useAuth();

  const session = authState.session?.split("|")[0];
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 text-center">No</TableHead>
            <TableHead>Date Schedule</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Boat</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBodyCustom
          colSpan={7}
          isError={isError}
          isLoading={isLoading}
          dataLength={data?.length}
        >
          {data?.map((value, index) => (
            <TableRow key={value.id}>
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell>
                <div className="flex">
                  <div className="w-16">Tanggal</div>
                  {value?.dateSchedule
                    ? formatDate(new Date(value.dateSchedule), "yyyy-MM-dd")
                    : ""}
                </div>
                <div className="flex">
                  <div className="w-16">Jam</div>
                  {value?.dateSchedule
                    ? formatDate(new Date(value.dateSchedule), "HH:mm")
                    : ""}
                </div>
              </TableCell>
              <TableCell>
                {value?.departure?.portName}-{value?.departure?.portCode}
              </TableCell>
              <TableCell>
                {value?.destination?.portName}-{value?.destination?.portCode}
              </TableCell>
              <TableCell>{value?.boat?.boatName}</TableCell>
              <TableCell>
                <div className="flex">
                  <div className="w-16">Price</div>
                  <div>{idrConverter(value?.price)}</div>
                </div>
                {session === "SUPERADMIN" && (
                  <div>
                    <div className="flex">
                      <div className="w-16">Markup</div>
                      <div>{idrConverter(value?.priceMarkup)}</div>
                    </div>
                    <div className="flex">
                      <div className="w-16">Total</div>
                      <div>
                        {idrConverter(value.price + value?.priceMarkup)}
                      </div>
                    </div>
                  </div>
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
