import { ButtonCustom } from "@/components/custom/ButtonCustom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type DialogDeleteProps = {
  title?: string;
  description?: string;
  isLoading?: boolean;
  openDialog: boolean;
  onOpenChange: (value: boolean) => void;
  onDelete: () => void;
};

export const DialogDelete = ({
  title,
  description,
  isLoading,
  openDialog,
  onOpenChange,
  onDelete,
}: DialogDeleteProps) => {
  return (
    <Dialog
      open={openDialog}
      onOpenChange={isLoading ? undefined : onOpenChange}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-3">
          <ButtonCustom
            variant="destructive"
            text="Delete"
            isLoading={isLoading}
            disabled={isLoading}
            onClick={onDelete}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
