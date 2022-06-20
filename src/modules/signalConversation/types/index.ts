import { Device, Sensor } from 'modules/main/types';

export type SignalConversationType = {
  id: number;
  name: string;
  description: string;
  updatedAt: string;
  createdAt: string;
  devices: Device[];
  sensors: Sensor[];
};

export type CreateSignalConversationPayload = Omit<
  SignalConversationType,
  'updatedAt' | 'createdAt' | 'id' | 'devices' | 'sensors'
>;

export interface DeleteSignalConversationPayload {
  id: number;
}
