import { SelectCustom } from "@/components/custom/SelectCustom";
import { SelectItem } from "@/components/ui/select";
import { useGetAllPort } from "../hooks/useGetAllPort";

type SelectPortProps = {
  label?: string;
  value?: number;
  onValueChange?: (value: number) => void;
  error?: boolean;
  errorMessage?: string;
  placeholder?: string;
};

export const SelectPort = ({
  label,
  value,
  onValueChange,
  error,
  errorMessage,
  placeholder,
}: SelectPortProps) => {
  const { data, isFetching, isError, error: errorFetch } = useGetAllPort();

  const dataEmpty = (data?.data?.length ?? 0) < 1;

  return (
    <SelectCustom
      width={100}
      label={label}
      placeholder={placeholder ?? "Select Port"}
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
                {value.portName}-{value.portCode}
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
