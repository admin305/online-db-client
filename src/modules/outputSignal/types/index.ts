import { Device, Sensor } from 'modules/main/types';

export type OutputSignalType = {
  id: number;
  name: string;
  description: string;
  updatedAt: string;
  createdAt: string;
  devices: Device[];
  sensors: Sensor[];
};

export type CreateOutputSignalPayload = Omit<
  OutputSignalType,
  'updatedAt' | 'createdAt' | 'id' | 'devices' | 'sensors'
>;

export interface DeleteOutputSignalPayload {
  id: number;
}
