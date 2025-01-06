import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
type AlertDialogCustomProps = {
  openAlertDialog: boolean;
  alertDialogTitle?: string;
  alertDialogDescription?: string;
  closeAlertDialog?: () => void;
  actionAlertDialog?: () => void;
  isCanCancel?: boolean;
};

export const AlertDialogCustom = ({
  openAlertDialog,
  alertDialogTitle,
  alertDialogDescription,
  closeAlertDialog,
  actionAlertDialog,
  isCanCancel,
}: AlertDialogCustomProps) => {
  return (
    <AlertDialog open={openAlertDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          {alertDialogTitle && (
            <AlertDialogTitle>{alertDialogTitle}</AlertDialogTitle>
          )}

          {alertDialogDescription && (
            <AlertDialogDescription>
              {alertDialogDescription}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isCanCancel}
            onClick={closeAlertDialog && closeAlertDialog}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={actionAlertDialog && actionAlertDialog}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
