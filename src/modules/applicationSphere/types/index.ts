export interface ApplicationSphereType {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  sensors: Record<string, unknown>[];
  devices: Record<string, unknown>[];
}

export type CreateApplicationSpherePayload = Omit<
  ApplicationSphereType,
  "updatedAt" | "createdAt" | "id" | "devices" | "sensors"
>;

export interface DeleteApplicationSpherePayload {
  id: number;
}

export type ApplicationSphereResponse = ApplicationSphereType;
