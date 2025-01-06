import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, Formik, FormikHelpers } from "formik";
import { BoatFormSchema, boatValidationSchema } from "../schemas/boatSchema";
import { ButtonCustom } from "@/components/custom/ButtonCustom";
import { FormBoat } from "./FormBoat";

type DialogBoatProps = {
  isLoading?: boolean;
  openDialog: boolean;
  onOpenChange: (value: boolean) => void;
  data?: BoatFormSchema;
  onSubmit: (
    value: BoatFormSchema,
    formik: FormikHelpers<BoatFormSchema>
  ) => void;
};

export const DialogBoat = ({
  isLoading,
  openDialog,
  onOpenChange,
  data,
  onSubmit,
}: DialogBoatProps) => {
  const initialValues: BoatFormSchema = {
    id: data?.id ?? undefined,
    boatName: data?.boatName ?? "",
    capacity: data?.capacity ?? undefined,
    boatImage: data?.boatImage ?? undefined,
    boatCompany: {
      id: data?.boatCompany?.id ?? undefined,
      companyName: data?.boatCompany?.companyName ?? "",
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
            {data?.id ? "Update Boat Company" : "Creat Boat Company"}
          </DialogTitle>
        </DialogHeader>

        <Formik<BoatFormSchema>
          initialValues={initialValues}
          validationSchema={boatValidationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <FormBoat />
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
