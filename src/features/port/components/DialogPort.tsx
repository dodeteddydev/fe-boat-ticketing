import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, Formik, FormikHelpers } from "formik";
import { PortFormSchema, portValidationSchema } from "../schemas/portSchema";
import { ButtonCustom } from "@/components/custom/ButtonCustom";
import { FormPort } from "./FormPort";

type DialogPortProps = {
  isLoading?: boolean;
  openDialog: boolean;
  onOpenChange: (value: boolean) => void;
  data?: PortFormSchema;
  onSubmit: (
    value: PortFormSchema,
    formik: FormikHelpers<PortFormSchema>
  ) => void;
};

export const DialogPort = ({
  isLoading,
  openDialog,
  onOpenChange,
  data,
  onSubmit,
}: DialogPortProps) => {
  const initialValues: PortFormSchema = {
    id: data?.id ?? undefined,
    portName: data?.portName ?? "",
    portCode: data?.portCode ?? "",
  };

  return (
    <Dialog
      open={openDialog}
      onOpenChange={isLoading ? undefined : onOpenChange}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {data?.id ? "Update Port Company" : "Creat Port Company"}
          </DialogTitle>
        </DialogHeader>

        <Formik<PortFormSchema>
          initialValues={initialValues}
          validationSchema={portValidationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <FormPort />
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
