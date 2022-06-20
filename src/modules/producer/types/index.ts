export type ProducerType = {
  id: number;
  name: string;
  address: string;
  website: string;
  phone: string;
  email: string;
  updatedAt: string;
  createdAt: string;
  devices: Record<string, unknown>[];
  sensors: Record<string, unknown>[];
};

export type CreateProducerPayload = Omit<
  ProducerType,
  "updatedAt" | "createdAt" | "id" | "devices" | "sensors"
>;

export interface DeleteProducerPayload {
  id: number;
}
