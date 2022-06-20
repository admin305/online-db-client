enum OperatingPrinciple {
  crouton = "Гренковый",
  capacitive = "Ёмкостной",
  inductiveЕransformer = "Индуктивно трансформаторный",
  inertial = "Инерциальный",
  mechanical = "Механический",
}

export interface IFilters {
  sensors: boolean;
  devices: boolean;
  measurementError: number | null;
  upperMeasuringRange: number | null;
  lowerMeasuringRange: number | null;
  valueUnit: string | null;
  requiredResource: number | null;
  upperAmbientTemperatureRange: number | null;
  lowerAmbientTemperatureRange: number | null;
  ambientTemperatureUnit: string | null;
  maxLength: number | null;
  maxWidth: number | null;
  maxHeight: number | null;
  lengthUnit: string | null;
  maximumWeight: number | null;
  weightUnit: string | null;
  power: string | null;
  protectionClass: string | null;
  operatingPrinciple: OperatingPrinciple | null;
}
