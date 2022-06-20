import { Device, Sensor } from 'modules/main/types';

export type SensitiveElementType = {
  id: number;
  name: string;
  description: string;
  updatedAt: string;
  createdAt: string;
  devices: Device[];
  sensors: Sensor[];
};

export type CreateSensitiveElementPayload = Omit<
  SensitiveElementType,
  'updatedAt' | 'createdAt' | 'id' | 'devices' | 'sensors'
>;

export interface DeleteSensitiveElementPayload {
  id: number;
}
