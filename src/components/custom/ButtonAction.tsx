import { Ellipsis, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";

type ButtonActionProps = {
  onClickUpdate: () => void;
  onClickDelete: () => void;
};

export const ButtonAction = ({
  onClickUpdate,
  onClickDelete,
}: ButtonActionProps) => {
  const [open, setOpen] = useState<boolean>();
  return (
    <div className="flex justify-center">
      <DropdownMenu open={open} onOpenChange={(value) => setOpen(value)}>
        <DropdownMenuTrigger asChild>
          <Ellipsis className="cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="flex gap-3 cursor-pointer"
            onClick={() => {
              setOpen(false);
              onClickUpdate();
            }}
          >
            <Pencil />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex gap-3 cursor-pointer"
            onClick={() => {
              setOpen(false);
              onClickDelete();
            }}
          >
            <Trash />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
