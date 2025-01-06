import { ButtonHTMLAttributes, ReactNode } from "react";
import { Button } from "../ui/button";
import { Loader2, LogOut } from "lucide-react";

type ButtonIconProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  text?: string;
  icon?: ReactNode;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
};

export const ButtonIcon = ({ ...props }: ButtonIconProps) => {
  return (
    <Button
      {...props}
      variant={props.variant}
      disabled={props.isLoading}
      size="icon"
    >
      {props.isLoading ? (
        <Loader2 className="animate-spin" />
      ) : (
        props.icon ?? <LogOut />
      )}
    </Button>
  );
};
