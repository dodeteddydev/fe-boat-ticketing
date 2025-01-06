import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, Formik, FormikHelpers } from "formik";
import {
  ScheduleFormSchema,
  scheduleValidationSchema,
} from "../schemas/scheduleSchema";
import { ButtonCustom } from "@/components/custom/ButtonCustom";
import { FormSchedule } from "./FormSchedule";

type DialogScheduleProps = {
  isLoading?: boolean;
  openDialog: boolean;
  onOpenChange: (value: boolean) => void;
  data?: ScheduleFormSchema;
  onSubmit: (
    value: ScheduleFormSchema,
    formik: FormikHelpers<ScheduleFormSchema>
  ) => void;
};

export const DialogSchedule = ({
  isLoading,
  openDialog,
  onOpenChange,
  data,
  onSubmit,
}: DialogScheduleProps) => {
  const initialValues: ScheduleFormSchema = {
    id: data?.id ?? undefined,
    dateSchedule: data?.dateSchedule ?? "",
    price: data?.price ?? undefined,
    priceMarkup: data?.priceMarkup ?? undefined,
    destination: {
      id: data?.destination?.id ?? undefined,
      portName: data?.destination?.portName ?? "",
      portCode: data?.destination?.portCode ?? "",
    },
    departure: {
      id: data?.departure?.id ?? undefined,
      portName: data?.departure?.portName ?? "",
      portCode: data?.departure?.portCode ?? "",
    },
    boat: {
      id: data?.boat?.id ?? undefined,
      boatName: data?.boat?.boatName ?? "",
    },
  };

  return (
    <Dialog
      open={openDialog}
      onOpenChange={isLoading ? undefined : onOpenChange}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {data?.id ? "Update Schedule" : "Creat Schedule"}
          </DialogTitle>
        </DialogHeader>

        <Formik<ScheduleFormSchema>
          initialValues={initialValues}
          validationSchema={scheduleValidationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <FormSchedule />
            <DialogFooter className="mt-3">
              <ButtonCustom
                text={data?.id ? "Update" : "Save"}
                isLoading={isLoading}
                disabled={isLoading}
                type="submit"
              />
            </DialogFooter>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
