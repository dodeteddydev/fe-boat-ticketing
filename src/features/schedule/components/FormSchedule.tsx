import { InputText } from "@/components/custom/InputText";
import { getIn, useFormikContext } from "formik";
import { ScheduleFormSchema } from "../schemas/scheduleSchema";
import { SelectBoat } from "@/features/boat/components/SelectBoat";
import { SelectPort } from "@/features/port/components/SelectPort";
import { useAuth } from "@/features/auth/contexts/useAuth";

export const FormSchedule = () => {
  const { values, setValues, setFieldValue, errors, touched } =
    useFormikContext<ScheduleFormSchema>();
  const { authState } = useAuth();

  const errorBoat = getIn(errors, "boat.id");
  const touchedBoat = getIn(touched, "boat.id");
  const errorDeparture = getIn(errors, "departure.id");
  const touchedDeparture = getIn(touched, "departure.id");
  const errorDestination = getIn(errors, "destination.id");
  const touchedDestination = getIn(touched, "destination.id");

  const session = authState.session?.split("|")[0];

  return (
    <div className="grid gap-3">
      <InputText
        type="datetime-local"
        label="Date"
        style={{ width: 200 }}
        value={values.dateSchedule}
        onChange={(e) => setFieldValue("dateSchedule", e.target.value)}
        error={touched.dateSchedule && Boolean(errors.dateSchedule)}
        errorMessage={errors.dateSchedule}
      />
      <SelectPort
        label="From"
        value={values.departure?.id}
        onValueChange={(value) =>
          setValues({
            ...values,
            departure: {
              ...values.departure,
              id: value,
            },
          })
        }
        error={touchedDeparture && Boolean(errorDeparture)}
        errorMessage={errorDeparture}
      />
      <SelectPort
        label="To"
        value={values.destination?.id}
        onValueChange={(value) =>
          setValues({
            ...values,
            destination: {
              ...values.destination,
              id: value,
            },
          })
        }
        error={touchedDestination && Boolean(errorDestination)}
        errorMessage={errorDestination}
      />
      <SelectBoat
        label="Boat"
        value={values.boat?.id}
        onValueChange={(value) =>
          setValues({
            ...values,
            boat: {
              ...values.boat,
              id: value,
            },
          })
        }
        error={touchedBoat && Boolean(errorBoat)}
        errorMessage={errorBoat}
      />
      <InputText
        type="number"
        label="Price"
        value={values.price}
        onChange={(e) => setFieldValue("price", parseInt(e.target.value))}
        error={touched.price && Boolean(errors.price)}
        errorMessage={errors.price}
      />
      {session === "SUPERADMIN" && (
        <InputText
          type="number"
          label="Price Markup"
          value={values.priceMarkup}
          onChange={(e) =>
            setFieldValue("priceMarkup", parseInt(e.target.value))
          }
        />
      )}
    </div>
  );
};
