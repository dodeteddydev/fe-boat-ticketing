import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, Formik, FormikHelpers } from "formik";
import {
  BoatCompanyFormSchema,
  boatCompanyValidationSchema,
} from "../schemas/boatCompanySchema";
import { ButtonCustom } from "@/components/custom/ButtonCustom";
import { FormBoatCompany } from "./FormBoatCompany";

type DialogBoatCompanyProps = {
  isLoading?: boolean;
  openDialog: boolean;
  onOpenChange: (value: boolean) => void;
  data?: BoatCompanyFormSchema;
  onSubmit: (
    value: BoatCompanyFormSchema,
    formik: FormikHelpers<BoatCompanyFormSchema>
  ) => void;
};

export const DialogBoatCompany = ({
  isLoading,
  openDialog,
  onOpenChange,
  data,
  onSubmit,
}: DialogBoatCompanyProps) => {
  const initialValues: BoatCompanyFormSchema = {
    id: data?.id ?? undefined,
    companyName: data?.companyName ?? "",
    companyLogo: data?.companyLogo ?? undefined,
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

        <Formik<BoatCompanyFormSchema>
          initialValues={initialValues}
          validationSchema={boatCompanyValidationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <FormBoatCompany />
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
