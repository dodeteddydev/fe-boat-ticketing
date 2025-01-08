import { PortFormSchema } from "../schemas/portSchema";
import { PortPayload } from "../types/PortPayload";

export const portPayloadMapper = (data: PortFormSchema): PortPayload => {
  return {
    id: data.id,
    portName: data.portName ?? "",
    portCode: data.portCode ?? "",
  };
};
