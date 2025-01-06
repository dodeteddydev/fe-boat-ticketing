import { ButtonCustom } from "@/components/custom/ButtonCustom";
import { DialogDelete } from "@/components/custom/DialogDelete";
import { InputText } from "@/components/custom/InputText";
import { PaginationCustom } from "@/components/custom/PaginationCustom";
import { toast } from "@/hooks/use-toast";
import { useDebounce } from "@/hooks/useDebounce";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useEffect, useState } from "react";
import { DialogBoatCompany } from "../components/DialogBoatCompany";
import { TableListBoatCompany } from "../components/TableListBoatCompany";
import { useCreateBoatCompany } from "../hooks/useCreateBoatCompany";
import { useDeleteBoatCompany } from "../hooks/useDeleteBoatCompany";
import { useGetListBoatCompany } from "../hooks/useGetListBoatCompany";
import { useUpdateBoatCompany } from "../hooks/useUpdateBoatCompany";
import { BoatCompanyFormSchema } from "../schemas/boatCompanySchema";
import { BoatCompanyParams } from "../types/boatCompanyParams";
import { boatCompanyPayloadMapper } from "../utilities/boatCompanyPayloadMapper";

type OpenDialog = {
  open: boolean;
  data?: BoatCompanyFormSchema;
};

type DeleteDialog = {
  open: boolean;
  id?: number;
};

export const BoatCompanyPage = () => {
  const [openDialog, setOpenDialog] = useState<OpenDialog>({
    open: false,
    data: undefined,
  });

  const [openDeleteDialog, setOpenDeleteDialog] = useState<DeleteDialog>({
    open: false,
    id: undefined,
  });

  const queryParams = useQueryParams<BoatCompanyParams>({
    search: undefined,
    page: undefined,
    size: undefined,
  });

  const params: BoatCompanyParams = {
    search: useDebounce(queryParams?.params.search),
    page: queryParams?.params.page ?? 1,
    size: queryParams?.params.size ?? 10,
  };

  const { data, isLoading, isError, refetch } = useGetListBoatCompany({
    queryKey: [params],
    params,
  });

  const dataLength = data?.data ? data.data.length : 0;

  useEffect(() => {
    queryParams.updateParams({
      search: queryParams?.params.search ?? undefined,
      page: data?.paging.currentPage ?? 1,
      size: data?.paging.size ?? 10,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const createBoatCompany = useCreateBoatCompany();
  const updateBoatCompany = useUpdateBoatCompany();
  const deleteBoatCompany = useDeleteBoatCompany();

  const onSave = (data: BoatCompanyFormSchema) => {
    return createBoatCompany.mutate(boatCompanyPayloadMapper(data), {
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

  const onUpdate = (data: BoatCompanyFormSchema) => {
    return updateBoatCompany.mutate(boatCompanyPayloadMapper(data), {
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
    return deleteBoatCompany.mutate(id, {
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
      <div className="flex justify-between">
        <InputText
          classNameParent="w-72 mb-6"
          placeholder="Search"
          onChange={(e) => queryParams.updateParams({ search: e.target.value })}
        />
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
      <TableListBoatCompany
        isError={isError}
        isLoading={isLoading}
        data={data?.data ?? []}
        onClickUpdate={(data) =>
          setOpenDialog({
            open: true,
            data: { id: data.id, companyName: data.companyName },
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
      <DialogBoatCompany
        data={openDialog.data}
        isLoading={createBoatCompany.isPending || updateBoatCompany.isPending}
        openDialog={openDialog.open}
        onOpenChange={(value) => setOpenDialog({ open: value })}
        onSubmit={(data) => (data.id ? onUpdate(data) : onSave(data))}
      />

      {/* Dialog Delete Boat Company */}
      <DialogDelete
        title="Delete Boat Company"
        description="Once deleted, this item cannot be recovered. Are you sure you want to continue?"
        isLoading={deleteBoatCompany.isPending}
        openDialog={openDeleteDialog.open}
        onOpenChange={(value) => setOpenDeleteDialog({ open: value })}
        onDelete={() => onDelete(openDeleteDialog.id!)}
      />
    </>
  );
};
