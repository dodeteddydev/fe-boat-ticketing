import { ButtonCustom } from "@/components/custom/ButtonCustom";
import { InputText } from "@/components/custom/InputText";
import { PaginationCustom } from "@/components/custom/PaginationCustom";
import { useDebounce } from "@/hooks/useDebounce";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useEffect, useState } from "react";
import { TableListPort } from "../components/TableListPort";
import { useGetListPort } from "../hooks/useGetListPort";
import { PortParams } from "../types/portParams";
import { PortFormSchema } from "../schemas/portSchema";
import { DialogPort } from "../components/DialogPort";
import { useCreatePort } from "../hooks/useCreatePort";
import { portPayloadMapper } from "../utilities/portPayloadMapper";
import { toast } from "@/hooks/use-toast";
import { useUpdatePort } from "../hooks/useUpdatePort";
import { DialogDelete } from "@/components/custom/DialogDelete";
import { useDeletePort } from "../hooks/useDeletePort";

type OpenDialog = {
  open: boolean;
  data?: PortFormSchema;
};

type DeleteDialog = {
  open: boolean;
  id?: number;
};

export const PortPage = () => {
  const [openDialog, setOpenDialog] = useState<OpenDialog>({
    open: false,
    data: undefined,
  });

  const [openDeleteDialog, setOpenDeleteDialog] = useState<DeleteDialog>({
    open: false,
    id: undefined,
  });

  const queryParams = useQueryParams<PortParams>({
    search: undefined,
    page: undefined,
    size: undefined,
  });

  const params: PortParams = {
    search: useDebounce(queryParams?.params.search),
    page: queryParams?.params.page ?? 1,
    size: queryParams?.params.size ?? 10,
  };

  const { data, isLoading, isError, refetch } = useGetListPort({
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

  const createPort = useCreatePort();
  const updatePort = useUpdatePort();
  const deletePort = useDeletePort();

  const onSave = (data: PortFormSchema) => {
    return createPort.mutate(portPayloadMapper(data), {
      onSuccess: (response) => {
        toast({
          duration: 1000,
          title: "Create Port Success",
          description: `${response.message}`,
        });

        setOpenDialog({ open: false });
        refetch();
      },
      onError: (error) => {
        const errrorMessage = error.response?.data.errors;

        toast({
          duration: 1000,
          title: "Create Port Failed",
          description: `${errrorMessage}`,
          variant: "destructive",
        });

        setOpenDialog({ open: false });
      },
    });
  };

  const onUpdate = (data: PortFormSchema) => {
    return updatePort.mutate(portPayloadMapper(data), {
      onSuccess: (response) => {
        toast({
          duration: 1000,
          title: "Update Port Success",
          description: `${response.message}`,
        });

        setOpenDialog({ open: false });
        refetch();
      },
      onError: (error) => {
        const errrorMessage = error.response?.data.errors;

        toast({
          duration: 1000,
          title: "Update Port Failed",
          description: `${errrorMessage}`,
          variant: "destructive",
        });

        setOpenDialog({ open: false });
      },
    });
  };

  const onDelete = (id: number) => {
    return deletePort.mutate(id, {
      onSuccess: (response) => {
        toast({
          duration: 1000,
          title: "Delete Port Success",
          description: `${response.message}`,
        });

        setOpenDeleteDialog({ open: false });
        refetch();
      },
      onError: (error) => {
        const errrorMessage = error.response?.data.errors;

        toast({
          duration: 1000,
          title: "Delete Port Failed",
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
        <InputText
          classNameParent="w-72 mb-6"
          placeholder="Search"
          value={queryParams.params.search ?? ""}
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
      <TableListPort
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

      {/* Dialog Create and Update Port */}
      <DialogPort
        data={openDialog.data}
        isLoading={createPort.isPending || updatePort.isPending}
        openDialog={openDialog.open}
        onOpenChange={(value) => setOpenDialog({ open: value })}
        onSubmit={(data) => (data.id ? onUpdate(data) : onSave(data))}
      />

      {/* Dialog Delete Port */}
      <DialogDelete
        title="Delete Port"
        description="Once deleted, this item cannot be recovered. Are you sure you want to continue?"
        isLoading={deletePort.isPending}
        openDialog={openDeleteDialog.open}
        onOpenChange={(value) => setOpenDeleteDialog({ open: value })}
        onDelete={() => onDelete(openDeleteDialog.id!)}
      />
    </>
  );
};
