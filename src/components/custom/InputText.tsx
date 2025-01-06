import { Input } from "../ui/input";
import { InputProps } from "@/types/inputType";
import { Label } from "../ui/label";

type InputTextProps = InputProps & {
  classNameParent?: string;
};

export const InputText = ({ ...props }: InputTextProps) => {
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

      <Input
        {...props}
        className={`${
          props.error &&
          "border-red-500 focus-visible:ring-red-300 outline-none"
        }`}
        id={props.id}
        placeholder={props.placeholder}
      />

      {props.error && (
        <p className="text-sm text-red-500">{props.errorMessage}</p>
      )}
    </div>
  );
};
