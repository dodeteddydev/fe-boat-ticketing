import { ButtonHTMLAttributes } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

type ButtonCustomProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  isLoading?: boolean;
  text?: string;
};

export const ButtonCustom = ({ ...props }: ButtonCustomProps) => {
  return (
    <Button variant={props.variant} {...props} disabled={props.isLoading}>
      {props.isLoading && <Loader2 className="animate-spin" />}
      {props.isLoading ? "Loading..." : props.text ?? "Submit"}
    </Button>
  );
};
