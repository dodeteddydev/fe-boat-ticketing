import { PortFormSchema } from "../schemas/portSchema";
import { PortPayload } from "../types/portPayload";

export const portPayloadMapper = (data: PortFormSchema): PortPayload => {
  return {
    id: data.id,
    portName: data.portName ?? "",
    portCode: data.portCode ?? "",
  };
};
