export type ControlType = {
  id: number;
  name: string;
  updatedAt: string;
  createdAt: string;
  devices: Record<string, unknown>[];
};

export type CreateControlTypePayload = Omit<
  ControlType,
  'updatedAt' | 'createdAt' | 'id' | 'devices'
>;

export interface DeleteControlTypePayload {
  id: number;
}
