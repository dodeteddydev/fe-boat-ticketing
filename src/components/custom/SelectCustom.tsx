import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ReactNode } from "react";
import { Label } from "../ui/label";
import { InputProps } from "@/types/inputType";

type SelectCustomProps = InputProps & {
  classNameParent?: string;
  placeholder?: string;
  isFetching?: boolean;
  isError?: boolean;
  errorMessageFetch?: string;
  selectItem?: ReactNode;
  value?: number;
  onValueChange?: (value: number) => void;
};

export const SelectCustom = ({ ...props }: SelectCustomProps) => {
  return (
    <div className={`grid ${props.classNameParent}`}>
      {props.label && (
        <Label
          className={`mb-1 ${props.error && "text-red-500"}`}
          htmlFor={props.id}
        >
          {props.label}
        </Label>
      )}

      <Select
        disabled={props.isFetching || props.isError}
        value={props.value?.toString() ?? ""}
        onValueChange={(value) =>
          props.onValueChange && props.onValueChange(parseInt(value))
        }
      >
        <SelectTrigger
          className={`${
            props.error &&
            "border-red-500 focus-visible:ring-red-300 outline-none"
          }`}
          id={props.id}
        >
          <SelectValue
            placeholder={
              props.isFetching
                ? "Loading..."
                : props.isError
                ? props.errorMessageFetch
                : props.placeholder
            }
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>{props.selectItem}</SelectGroup>
        </SelectContent>
      </Select>

      {props.error && (
        <p className="text-sm text-red-500">{props.errorMessage}</p>
      )}
    </div>
  );
};
