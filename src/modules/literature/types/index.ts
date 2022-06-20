export type LiteratureType = {
  id: number;
  name: string;
  author: string;
  year_of_publish: number;
  literature_publisher: string;
  literature_website: string;
  updatedAt: string;
  createdAt: string;
  devices: Record<string, unknown>[];
  sensors: Record<string, unknown>[];
};

export type CreateLiteraturePayload = Omit<
  LiteratureType,
  "updatedAt" | "createdAt" | "id" | "devices" | "sensors"
>;

export interface DeleteLiteraturePayload {
  id: number;
}

