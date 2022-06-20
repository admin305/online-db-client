export type PurposeType = {
  id: number;
  name: string;
  updatedAt: string;
  createdAt: string;
  devices: Record<string, unknown>[];
};

export type CreatePurposePayload = Omit<PurposeType, 'updatedAt' | 'createdAt' | 'id' | 'devices'>;

export interface DeletePurposePayload {
  id: number;
}
