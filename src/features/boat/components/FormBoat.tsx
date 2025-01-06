import { InputText } from "@/components/custom/InputText";
import { getIn, useFormikContext } from "formik";
import { BoatFormSchema } from "../schemas/boatSchema";
import { SelectBoatCompany } from "@/features/boat-company/components/SelectBoatCompany";
import { InputPicture } from "@/components/custom/InputPicture";

export const FormBoat = () => {
  const { values, setFieldValue, setValues, errors, touched } =
    useFormikContext<BoatFormSchema>();

  const errorBoatCompany = getIn(errors, "boatCompany.id");
  const touchedBoatCompany = getIn(touched, "boatCompany.id");

  return (
    <div className="grid gap-3">
      <SelectBoatCompany
        label="Boat Company"
        value={values.boatCompany?.id}
        onValueChange={(value) =>
          setValues({
            ...values,
            boatCompany: {
              ...values.boatCompany,
              id: value,
            },
          })
        }
        error={touchedBoatCompany && Boolean(errorBoatCompany)}
        errorMessage={errorBoatCompany}
      />
      <InputText
        label="Boat Name"
        value={values.boatName}
        onChange={(e) => setFieldValue("boatName", e.target.value)}
        error={touched.boatName && Boolean(errors.boatName)}
        errorMessage={errors.boatName}
      />
      <InputPicture
        label="Boat Image"
        onChange={(e) => setFieldValue("boatImage", e.target.files?.[0])}
      />
      <InputText
        type="number"
        label="Capacity"
        value={values.capacity}
        onChange={(e) => setFieldValue("capacity", parseInt(e.target.value))}
        error={touched.capacity && Boolean(errors.capacity)}
        errorMessage={errors.capacity}
      />
    </div>
  );
};
