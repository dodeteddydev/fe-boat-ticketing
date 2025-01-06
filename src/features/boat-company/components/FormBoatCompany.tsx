import { InputText } from "@/components/custom/InputText";
import { useFormikContext } from "formik";
import { BoatCompanyFormSchema } from "../schemas/boatCompanySchema";
import { InputPicture } from "@/components/custom/InputPicture";

export const FormBoatCompany = () => {
  const { values, setFieldValue, errors, touched } =
    useFormikContext<BoatCompanyFormSchema>();

  return (
    <div className="grid gap-3">
      <InputText
        label="Company Name"
        value={values.companyName}
        onChange={(e) => setFieldValue("companyName", e.target.value)}
        error={touched.companyName && Boolean(errors.companyName)}
        errorMessage={errors.companyName}
      />
      <InputPicture
        label="Company Logo"
        onChange={(e) => setFieldValue("companyLogo", e.target.files?.[0])}
      />
    </div>
  );
};
