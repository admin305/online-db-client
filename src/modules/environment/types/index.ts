export type EnvironmentType = {
    id: number;
    name: string;
    description: string;
    updatedAt: string;
    createdAt: string;
    devices: Record<string, unknown>[];
    sensors: Record<string, unknown>[];
  };
  
  export type CreateEnvironmentPayload = Omit<
  EnvironmentType,
    "updatedAt" | "createdAt" | "id" | "devices" | "sensors"
  >;
  
  export interface DeleteEnvironmentPayload {
    id: number;
  }