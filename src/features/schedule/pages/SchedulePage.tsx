import { ButtonCustom } from "@/components/custom/ButtonCustom";
import { ButtonIcon } from "@/components/custom/ButtonIcon";
import { DialogDelete } from "@/components/custom/DialogDelete";
import { PaginationCustom } from "@/components/custom/PaginationCustom";
import { SelectBoat } from "@/features/boat/components/SelectBoat";
import { SelectPort } from "@/features/port/components/SelectPort";
import { toast } from "@/hooks/use-toast";
import { useDebounce } from "@/hooks/useDebounce";
import { useQueryParams } from "@/hooks/useQueryParams";
import { Filter, FilterX } from "lucide-react";
import { useEffect, useState } from "react";
import { DialogSchedule } from "../components/DialogSchedule";
import { TableListSchedule } from "../components/TableListSchedule";
import { useCreateSchedule } from "../hooks/useCreateSchedule";
import { useDeleteSchedule } from "../hooks/useDeleteSchedule";
import { useGetListSchedule } from "../hooks/useGetListSchedule";
import { useUpdateSchedule } from "../hooks/useUpdateSchedule";
import { ScheduleFormSchema } from "../schemas/scheduleSchema";
import { ScheduleParams } from "../types/scheduleParams";
import { schedulePayloadMapper } from "../utilities/schedulePayloadMapper";

type OpenDialog = {
  open: boolean;
  data?: ScheduleFormSchema;
};

type DeleteDialog = {
  open: boolean;
  id?: number;
};

export const SchedulePage = () => {
  const [openDialog, setOpenDialog] = useState<OpenDialog>({
    open: false,
    data: undefined,
  });

  const [openDeleteDialog, setOpenDeleteDialog] = useState<DeleteDialog>({
    open: false,
    id: undefined,
  });

  const queryParams = useQueryParams<ScheduleParams>({
    search: undefined,
    dateSchedule: undefined,
    destinationId: undefined,
    departureId: undefined,
    boatId: undefined,
    page: undefined,
    size: undefined,
  });

  const params: ScheduleParams = {
    search: useDebounce(queryParams?.params.search),
    dateSchedule: queryParams?.params.dateSchedule,
    destinationId: queryParams?.params.destinationId,
    departureId: queryParams?.params.departureId,
    boatId: queryParams?.params.boatId,
    page: queryParams?.params.page ?? 1,
    size: queryParams?.params.size ?? 10,
  };

  const { data, isLoading, isError, refetch } = useGetListSchedule({
    queryKey: [params],
    params,
  });

  const dataLength = data?.data ? data.data.length : 0;

  useEffect(() => {
    queryParams.updateParams({
      search: queryParams?.params.search ?? undefined,
      dateSchedule: queryParams?.params.dateSchedule ?? undefined,
      destinationId: queryParams?.params.destinationId ?? undefined,
      departureId: queryParams?.params.departureId ?? undefined,
      boatId: queryParams?.params.boatId ?? undefined,
      page: data?.paging.currentPage ?? 1,
      size: data?.paging.size ?? 10,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const createBoat = useCreateSchedule();
  const updateBoat = useUpdateSchedule();
  const deleteBoat = useDeleteSchedule();

  const onSave = (data: ScheduleFormSchema) => {
    return createBoat.mutate(schedulePayloadMapper(data), {
      onSuccess: (response) => {
        toast({
          duration: 1000,
          title: "Create Schedule Success",
          description: `${response.message}`,
        });

        setOpenDialog({ open: false });
        refetch();
      },
      onError: (error) => {
        const errrorMessage = error.response?.data.errors;

        toast({
          duration: 1000,
          title: "Create Schedule Failed",
          description: `${errrorMessage}`,
          variant: "destructive",
        });

        setOpenDialog({ open: false });
      },
    });
  };

  const onUpdate = (data: ScheduleFormSchema) => {
    return updateBoat.mutate(schedulePayloadMapper(data), {
      onSuccess: (response) => {
        toast({
          duration: 1000,
          title: "Update Schedule Success",
          description: `${response.message}`,
        });

        setOpenDialog({ open: false });
        refetch();
      },
      onError: (error) => {
        const errrorMessage = error.response?.data.errors;

        toast({
          duration: 1000,
          title: "Update Schedule Failed",
          description: `${errrorMessage}`,
          variant: "destructive",
        });

        setOpenDialog({ open: false });
      },
    });
  };

  const onDelete = (id: number) => {
    return deleteBoat.mutate(id, {
      onSuccess: (response) => {
        toast({
          duration: 1000,
          title: "Delete Schedule Success",
          description: `${response.message}`,
        });

        setOpenDeleteDialog({ open: false });
        refetch();
      },
      onError: (error) => {
        const errrorMessage = error.response?.data.errors;

        toast({
          duration: 1000,
          title: "Delete Schedule Failed",
          description: `${errrorMessage}`,
          variant: "destructive",
        });

        setOpenDeleteDialog({ open: false });
      },
    });
  };

  const [showFilter, setShowFilter] = useState<boolean>(false);

  return (
    <>
      {/* Filter */}
      <div className="flex flex-col sm:flex-row justify-between">
        <div>
          <div className="flex gap-2">
            <div className={`min-w-72 ${showFilter ? "mb-3" : "mb-6"}`}>
              <SelectBoat
                value={queryParams.params.boatId}
                onValueChange={(value) =>
                  queryParams.updateParams({ boatId: value })
                }
              />
            </div>
            <ButtonIcon
              icon={<Filter />}
              onClick={() => {
                setShowFilter(!showFilter);
                if (showFilter) {
                  queryParams.updateParams({
                    search: undefined,
                    dateSchedule: undefined,
                    destinationId: undefined,
                    departureId: undefined,
                    boatId: undefined,
                  });
                }
              }}
            />
            <ButtonIcon
              variant="outline"
              icon={<FilterX />}
              onClick={() =>
                queryParams.updateParams({
                  search: undefined,
                  dateSchedule: undefined,
                  destinationId: undefined,
                  departureId: undefined,
                  boatId: undefined,
                })
              }
            />
          </div>
          {showFilter && (
            <div className="grid gap-3">
              <div className="min-w-40">
                <SelectPort
                  placeholder="Select Departure"
                  value={queryParams.params.departureId}
                  onValueChange={(value) =>
                    queryParams.updateParams({ departureId: value })
                  }
                />
              </div>
              <div className="min-w-40">
                <SelectPort
                  placeholder="Select Destination"
                  value={queryParams.params.destinationId}
                  onValueChange={(value) =>
                    queryParams.updateParams({ destinationId: value })
                  }
                />
              </div>
            </div>
          )}
        </div>

        <ButtonCustom
          text="CREATE"
          onClick={() =>
            setOpenDialog({
              open: true,
            })
          }
        />
      </div>

      {/* Table */}
      <TableListSchedule
        isError={isError}
        isLoading={isLoading}
        data={data?.data ?? []}
        onClickUpdate={(data) =>
          setOpenDialog({
            open: true,
            data: data,
          })
        }
        onClickDelete={(id) =>
          setOpenDeleteDialog({
            open: true,
            id: id,
          })
        }
      />

      {/* Pagination */}
      {dataLength > 0 && (
        <PaginationCustom
          page={data?.paging.currentPage}
          totalPage={data?.paging.totalPage}
          onChangePage={(page) => queryParams.updateParams({ page: page })}
        />
      )}

      {/* Dialog Create and Update Schedule */}
      <DialogSchedule
        data={openDialog.data}
        isLoading={createBoat.isPending || updateBoat.isPending}
        openDialog={openDialog.open}
        onOpenChange={(value) => setOpenDialog({ open: value })}
        onSubmit={(data) => (data.id ? onUpdate(data) : onSave(data))}
      />

      {/* Dialog Delete Schedule */}
      <DialogDelete
        title="Delete Schedule"
        description="Once deleted, this item cannot be recovered. Are you sure you want to continue?"
        isLoading={deleteBoat.isPending}
        openDialog={openDeleteDialog.open}
        onOpenChange={(value) => setOpenDeleteDialog({ open: value })}
        onDelete={() => onDelete(openDeleteDialog.id!)}
      />
    </>
  );
};
