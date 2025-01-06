import { SelectCustom } from "@/components/custom/SelectCustom";
import { SelectItem } from "@/components/ui/select";
import { useGetAllBoat } from "../hooks/useGetAllBoat";

type SelectBoatProps = {
  label?: string;
  value?: number;
  onValueChange?: (value: number) => void;
  error?: boolean;
  errorMessage?: string;
};

export const SelectBoat = ({
  label,
  value,
  onValueChange,
  error,
  errorMessage,
}: SelectBoatProps) => {
  const { data, isFetching, isError, error: errorFetch } = useGetAllBoat();

  return (
    <SelectCustom
      label={label}
      placeholder="Select Boat"
      isFetching={isFetching}
      isError={isError}
      errorMessageFetch={errorFetch?.response?.data.message}
      value={value}
      onValueChange={(value) => onValueChange && onValueChange(value)}
      selectItem={
        <>
          {data?.data.map((value) => (
            <SelectItem key={value.id} value={value.id.toString()}>
              {value.boatName}
            </SelectItem>
          ))}
        </>
      }
      error={error}
      errorMessage={errorMessage}
    />
  );
};
