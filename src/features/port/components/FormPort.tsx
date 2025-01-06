import { InputText } from "@/components/custom/InputText";
import { useFormikContext } from "formik";
import { PortFormSchema } from "../schemas/portSchema";

export const FormPort = () => {
  const { values, setFieldValue, errors, touched } =
    useFormikContext<PortFormSchema>();

  return (
    <div className="grid gap-3">
      <InputText
        label="Port Name"
        value={values.portName}
        onChange={(e) => setFieldValue("portName", e.target.value)}
        error={touched.portName && Boolean(errors.portName)}
        errorMessage={errors.portName}
      />
      <InputText
        label="Port Code"
        value={values.portCode}
        onChange={(e) => setFieldValue("portCode", e.target.value)}
        error={touched.portCode && Boolean(errors.portCode)}
        errorMessage={errors.portCode}
      />
    </div>
  );
};
