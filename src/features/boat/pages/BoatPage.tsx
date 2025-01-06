import { ButtonCustom } from "@/components/custom/ButtonCustom";
import { InputText } from "@/components/custom/InputText";
import { PaginationCustom } from "@/components/custom/PaginationCustom";
import { useDebounce } from "@/hooks/useDebounce";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useEffect, useState } from "react";
import { TableListBoat } from "../components/TableListBoat";
import { useGetListBoat } from "../hooks/useGetListBoat";
import { BoatParams } from "../types/boatParams";
import { BoatFormSchema } from "../schemas/boatSchema";
import { DialogBoat } from "../components/DialogBoat";
import { useCreateBoat } from "../hooks/useCreateBoat";
import { boatPayloadMapper } from "../utilities/boatPayloadMapper";
import { toast } from "@/hooks/use-toast";
import { useUpdateBoat } from "../hooks/useUpdateBoat";
import { DialogDelete } from "@/components/custom/DialogDelete";
import { useDeleteBoat } from "../hooks/useDeleteBoat";
import { SelectBoatCompany } from "@/features/boat-company/components/SelectBoatCompany";
import { ButtonIcon } from "@/components/custom/ButtonIcon";
import { FilterX } from "lucide-react";

type OpenDialog = {
  open: boolean;
  data?: BoatFormSchema;
};

type DeleteDialog = {
  open: boolean;
  id?: number;
};

export const BoatPage = () => {
  const [openDialog, setOpenDialog] = useState<OpenDialog>({
    open: false,
    data: undefined,
  });

  const [openDeleteDialog, setOpenDeleteDialog] = useState<DeleteDialog>({
    open: false,
    id: undefined,
  });

  const queryParams = useQueryParams<BoatParams>({
    search: undefined,
    boatCompanyId: undefined,
    page: undefined,
    size: undefined,
  });

  const params: BoatParams = {
    search: useDebounce(queryParams?.params.search),
    boatCompanyId: queryParams?.params?.boatCompanyId,
    page: queryParams?.params.page ?? 1,
    size: queryParams?.params.size ?? 10,
  };

  const { data, isLoading, isError, refetch } = useGetListBoat({
    queryKey: [params],
    params,
  });

  const dataLength = data?.data ? data.data.length : 0;

  useEffect(() => {
    queryParams.updateParams({
      search: queryParams?.params.search ?? undefined,
      boatCompanyId: queryParams?.params.boatCompanyId ?? undefined,
      page: data?.paging.currentPage ?? 1,
      size: data?.paging.size ?? 10,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const createBoat = useCreateBoat();
  const updateBoat = useUpdateBoat();
  const deleteBoat = useDeleteBoat();

  const onSave = (data: BoatFormSchema) => {
    return createBoat.mutate(boatPayloadMapper(data), {
      onSuccess: (response) => {
        toast({
          duration: 1000,
          title: "Create Boat Company Success",
          description: `${response.message}`,
        });

        setOpenDialog({ open: false });
        refetch();
      },
      onError: (error) => {
        const errrorMessage = error.response?.data.errors;

        toast({
          duration: 1000,
          title: "Create Boat Company Failed",
          description: `${errrorMessage}`,
          variant: "destructive",
        });

        setOpenDialog({ open: false });
      },
    });
  };

  const onUpdate = (data: BoatFormSchema) => {
    return updateBoat.mutate(boatPayloadMapper(data), {
      onSuccess: (response) => {
        toast({
          duration: 1000,
          title: "Update Boat Company Success",
          description: `${response.message}`,
        });

        setOpenDialog({ open: false });
        refetch();
      },
      onError: (error) => {
        const errrorMessage = error.response?.data.errors;

        toast({
          duration: 1000,
          title: "Update Boat Company Failed",
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
          title: "Delete Boat Company Success",
          description: `${response.message}`,
        });

        setOpenDeleteDialog({ open: false });
        refetch();
      },
      onError: (error) => {
        const errrorMessage = error.response?.data.errors;

        toast({
          duration: 1000,
          title: "Delete Boat Company Failed",
          description: `${errrorMessage}`,
          variant: "destructive",
        });

        setOpenDeleteDialog({ open: false });
      },
    });
  };

  return (
    <>
      {/* Filter */}
      <div className="flex flex-col sm:flex-row justify-between">
        <div className="flex gap-3">
          <InputText
            classNameParent="w-72 mb-6"
            placeholder="Search"
            value={queryParams.params.search ?? ""}
            onChange={(e) =>
              queryParams.updateParams({ search: e.target.value })
            }
          />
          <div className="w-72">
            <SelectBoatCompany
              value={queryParams.params.boatCompanyId}
              onValueChange={(value) =>
                queryParams.updateParams({ boatCompanyId: value })
              }
            />
          </div>
          <ButtonIcon
            variant="outline"
            icon={<FilterX />}
            onClick={() =>
              queryParams.updateParams({
                search: undefined,
                boatCompanyId: undefined,
              })
            }
          />
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
      <TableListBoat
        isError={isError}
        isLoading={isLoading}
        data={data?.data ?? []}
        onClickUpdate={(data) =>
          setOpenDialog({
            open: true,
            data: {
              id: data.id,
              boatName: data.boatName,
              boatCompany: {
                id: data.boatCompany.id,
                companyName: data.boatCompany.companyName,
              },
              capacity: data.capacity,
            },
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

      {/* Dialog Create and Update Boat Company */}
      <DialogBoat
        data={openDialog.data}
        isLoading={createBoat.isPending || updateBoat.isPending}
        openDialog={openDialog.open}
        onOpenChange={(value) => setOpenDialog({ open: value })}
        onSubmit={(data) => (data.id ? onUpdate(data) : onSave(data))}
      />

      {/* Dialog Delete Boat Company */}
      <DialogDelete
        title="Delete Boat Company"
        description="Once deleted, this item cannot be recovered. Are you sure you want to continue?"
        isLoading={deleteBoat.isPending}
        openDialog={openDeleteDialog.open}
        onOpenChange={(value) => setOpenDeleteDialog({ open: value })}
        onDelete={() => onDelete(openDeleteDialog.id!)}
      />
    </>
  );
};
