import { Device, Sensor } from 'modules/main/types';

export type ManufacturingTechnologyType = {
  id: number;
  name: string;
  description: string;
  updatedAt: string;
  createdAt: string;
  devices: Device[];
  sensors: Sensor[];
};

export type CreateManufacturingTechnologyPayload = Omit<
  ManufacturingTechnologyType,
  'updatedAt' | 'createdAt' | 'id' | 'devices' | 'sensors'
>;

export interface DeleteManufacturingTechnologyPayload {
  id: number;
}
