import { LogOut, Settings, User } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type ButtonActionSettingProps = {
  onClickProfile: () => void;
  onClickSignOut: () => void;
};

export const ButtonActionSetting = ({
  onClickProfile,
  onClickSignOut,
}: ButtonActionSettingProps) => {
  const [open, setOpen] = useState<boolean>();
  return (
    <DropdownMenu open={open} onOpenChange={(value) => setOpen(value)}>
      <DropdownMenuTrigger asChild>
        <Settings className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="flex gap-3 cursor-pointer"
          onClick={() => {
            setOpen(false);
            onClickProfile();
          }}
        >
          <User />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex gap-3 cursor-pointer"
          onClick={() => {
            setOpen(false);
            onClickSignOut();
          }}
        >
          <LogOut />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
