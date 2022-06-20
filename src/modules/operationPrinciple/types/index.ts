import { Device, Sensor } from "modules/main/types";

export type OperationPrincipleType = {
  id: number;
  name: string;
  description: string;
  updatedAt: string;
  createdAt: string;
  devices: Device[];
  sensors: Sensor[];
};

export type CreateOperationPrinciplePayload = Omit<
  OperationPrincipleType,
  "updatedAt" | "createdAt" | "id" | "devices" | "sensors"
>;

export interface DeleteOperationPrinciplePayload {
  id: number;
}
