import { SelectCustom } from "@/components/custom/SelectCustom";
import { SelectItem } from "@/components/ui/select";
import { useGetAllBoatCompany } from "../hooks/useGetAllBoatCompany";

type SelectBoatCompanyProps = {
  label?: string;
  value?: number;
  onValueChange?: (value: number) => void;
  error?: boolean;
  errorMessage?: string;
};

export const SelectBoatCompany = ({
  label,
  value,
  onValueChange,
  error,
  errorMessage,
}: SelectBoatCompanyProps) => {
  const {
    data,
    isFetching,
    isError,
    error: errorFetch,
  } = useGetAllBoatCompany();

  const dataEmpty = (data?.data?.length ?? 0) < 1;

  return (
    <SelectCustom
      label={label}
      placeholder="Select Boat Company"
      isFetching={isFetching}
      isError={isError}
      errorMessageFetch={errorFetch?.response?.data.message}
      value={value}
      onValueChange={(value) => onValueChange && onValueChange(value)}
      selectItem={
        dataEmpty ? (
          <p className="p-2 text-sm">Tidak ada data</p>
        ) : (
          <>
            {data?.data.map((value) => (
              <SelectItem key={value.id} value={value.id.toString()}>
                {value.companyName}
              </SelectItem>
            ))}
          </>
        )
      }
      error={error}
      errorMessage={errorMessage}
    />
  );
};
