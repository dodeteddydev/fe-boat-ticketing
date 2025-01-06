import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputProps } from "@/types/inputType";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export const InputPassword = ({ ...props }: InputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="grid">
      {props.label && (
        <Label
          className={`mb-1.5 ${props.error && "text-red-500"}`}
          htmlFor={props.id}
        >
          {props.label}
        </Label>
      )}

      <div className="relative">
        <Input
          {...props}
          className={`${
            props.error &&
            "border-red-500 focus-visible:ring-red-300 outline-none"
          }`}
          id={props.id}
          placeholder={props.placeholder || "Enter your password"}
          type={showPassword ? "text" : "password"}
        />
        <button
          type="button"
          className="absolute right-3 top-1.5"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <Eye
              width={15}
              className={`${props.error && "text-red-500"} text-gray-400`}
            />
          ) : (
            <EyeOff
              width={15}
              className={`${props.error && "text-red-500"} text-gray-400`}
            />
          )}
        </button>
      </div>

      {props.error && (
        <p className="text-sm text-red-500">{props.errorMessage}</p>
      )}
    </div>
  );
};
