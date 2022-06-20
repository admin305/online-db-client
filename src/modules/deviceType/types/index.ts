export type DeviceType = {
  id: number;
  name: string;
  updatedAt: string;
  createdAt: string;
  devices: string;
  sensors: string;
};

export type CreateDeviceType = Omit<
  DeviceType,
  'updatedAt' | 'createdAt' | 'id' | 'devices' | 'sensors'
>;

export interface DeleteDeviceType {
  id: number;
}
