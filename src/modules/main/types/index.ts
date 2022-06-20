export interface Sensor {
  id: number;
  name: string;
  height: number;
  width: number;
  length: number;
  diameter: number;
  unit_of_length: string;
  weight: number;
  unit_of_weight: string;
  measure_min: number;
  measure_max: number;
  unit_of_measuring: string;
  measurement_error: number;
  output: string;
  power: string;
  protection_class: string;
  temperature_unit: string;
  blueprint: string;
  description: string;
  scheme: string;
  measuring_channels: number;
  lower_temperature_threshold: number;
  upper_temperature_threshold: number;
  measure_min_temp: string;
  measure_max_temp: string;
  resource: number;
  dynamic_warm_up_time: number;
  din_t_heat_ed: string;
  dynamic_shift_factor: number;
  dynamic_time_constant: number;
  dynamic_cutoff_frequency_min: number;
  dynamic_cutoff_frequency_max: number;
  dynamic_resonant_frequency: number;
  dynamic_damping_factor: number;
  dynamic_static_sensitivity: number;
  dynamic_description: string;
  dynamic_error: number;
  createdAt: string;
  updatedAt: string;
  devices: Device[];
  application_spheres: ApplicationSphere[];
  environments: Environment[];
  literatures: Literature[];
  measurable_values: MeasurableValues[];
  type: ViewType[];
  signal_conversations: SignalConversations[];
  output_signals: OutputSignals[];
  manufacturing_technologys: ManufacturingTechnologys[];
  producers: Producers[];
  operation_principles: OperationPrinciples[];
  sensitive_elements: SensitiveElements[];
}

export interface CreateSensorPayload {
  name: string;
  height: number;
  width: number;
  length: number;
  diameter: number;
  unit_of_length: string;
  weight: number;
  unit_of_weight: string;
  measure_min: number;
  measure_max: number;
  unit_of_measuring: string;
  measurement_error: number;
  output: string;
  power: string;
  protection_class: string;
  temperature_unit: string;
  blueprint: string;
  description: string;
  scheme: string;
  measuring_channels: number;
  lower_temperature_threshold: number;
  upper_temperature_threshold: number;
  measure_min_temp: string;
  measure_max_temp: string;
  resource: number;
  dynamic_warm_up_time: number;
  din_t_heat_ed: string;
  dynamic_shift_factor: number;
  dynamic_time_constant: number;
  dynamic_cutoff_frequency_min: number;
  dynamic_cutoff_frequency_max: number;
  dynamic_resonant_frequency: number;
  dynamic_damping_factor: number;
  dynamic_static_sensitivity: number;
  dynamic_description: string;
  dynamic_error: number;
  device: string;
  application_sphere: string;
  environment: string;
  literature: string;
  measurable_value: string;
  type: string;
  signal_conversation: string;
  output_signal: string;
  manufacturing_technology: string;
  producer: string;
  operation_principle: string;
  sensitive_element: string;
}

export type RemoveSensor = {
  id: number;
};

export type SensitiveElements = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  SensorSensetiveElement: {
    id: number;
    sensor_id: number;
    sensetive_element_id: number;
    createdAt: string;
    updatedAt: string;
  };
};

export type OperationPrinciples = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  SensorOperationPrinciple: SensorOperationPrinciple;
};

interface SensorOperationPrinciple {
  id: number;
  sensor_id: number;
  operation_princip: number;
  createdAt: string;
  updatedAt: string;
}

export type CreateDevicePayload = {
  name: string;
  in_resistance: string;
  out_resistance: string;
  height: number;
  width: number;
  length: number;
  diameter: number;
  unit_of_length: string;
  weight: number;
  unit_of_weight: string;
  measure_min: number;
  measure_max: number;
  unit_of_measuring: string;
  measurement_error: number;
  output: string;
  power: string;
  protection_class: string;
  temperature_unit: string;
  description: string;
  measuring_channels: number;
  lower_temperature_threshold: number;
  upper_temperature_threshold: number;
  measure_min_temp: string;
  measure_max_temp: string;
  resource: number;
  dynamic_warm_up_time: number;
  din_t_heat_ed: string;
  dynamic_shift_factor: number;
  dynamic_time_constant: number;
  dynamic_cutoff_frequency_min: number;
  dynamic_cutoff_frequency_max: number;
  dynamic_resonant_frequency: number;
  dynamic_damping_factor: number;
  dynamic_static_sensitivity: number;
  dynamic_description: string;
  dynamic_error: number;
  output_voltage: string;
  ad_running_time_unit: string;
  din_t_heat_ed_ad: string;
  din_faz_sdvig_ad: number;
  sensor: string;
  control_type: string;
  type: string;
  purpose: string;
  operation_principle: string;
  producer: string;
  manufacturing_technology: string;
};

export type Device = Omit<
  CreateDevicePayload,
  | 'sensor'
  | 'control_type'
  | 'type'
  | 'purpose'
  | 'operation_principles'
  | 'producers'
  | 'manufacturing_technologys'
> & {
  id: number;
  updatedAt: string;
  createdAt: string;
  sensors: Sensor[];
  control_type: string;
  type: ViewType[];
  purpose: string;
  operation_principles: OperationPrinciples[];
  producers: Producers[];
  manufacturing_technologys: ManufacturingTechnologys[];
};

export type RemoveDevice = RemoveSensor;

interface SenosrsInDevice {
  id: 1;
  device_id: 1;
  sensor_id: 23;
  createdAt: string;
  updatedAt: string;
}

export type ApplicationSphere = {
  id: 2;
  name: string;
  createdAt: string;
  updatedAt: string;
  SensorApplicationSphere: SensorApplicationSphere;
};

interface SensorApplicationSphere {
  id: number;
  sensor_id: number;
  application_sphere_: number;
  createdAt: string;
  updatedAt: string;
}

export type Environment = {
  id: 1;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  SensorEnvironment: SensorEnvironment;
};

interface SensorEnvironment {
  id: number;
  sensor_id: number;
  environment_id: number;
  createdAt: string;
  updatedAt: string;
}

export type Literature = {
  id: number;
  name: string;
  author: string;
  year_of_publish: number;
  literature_publisher: string;
  literature_website: string;
  createdAt: string;
  updatedAt: string;
  SensorLiterature: SensorLiterature;
};

interface SensorLiterature {
  id: number;
  sensor_id: number;
  literature_id: number;
  createdAt: string;
  updatedAt: string;
}

export type MeasurableValues = {
  id: number;
  name: string;
  description: string;
  measurerange_min: number;
  measurerange_max: number;
  createdAt: string;
  updatedAt: string;
  SensorMeasurableValue: SensorMeasurableValue;
};

interface SensorMeasurableValue {
  id: number;
  measurable_id: number;
  sensor_id: number;
  createdAt: string;
  updatedAt: string;
}

export type ViewType = {
  id: 1;
  name: string;
  createdAt: string;
  updatedAt: string;
  sensors: Sensor[];
  devices: Device[];
};

interface SensorType {
  id: number;
  sensor_id: number;
  type_id: number;
  createdAt: string;
  updatedAt: string;
}

export type SignalConversations = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  SensorSignalConversation: SensorSignalConversation;
};

interface SensorSignalConversation {
  id: number;
  sensor_id: number;
  signal_conversati: number;
  createdAt: string;
  updatedAt: string;
}

export type OutputSignals = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  SensorOutputSignal: SensorOutputSignal;
};

interface SensorOutputSignal {
  id: number;
  sensor_id: number;
  output_signal_id: number;
  createdAt: string;
  updatedAt: string;
}

export type ManufacturingTechnologys = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  SensorManufacturingTechnology: SensorManufacturingTechnology;
};

interface SensorManufacturingTechnology {
  id: number;
  sensor_: number;
  manufac: number;
  created: string;
  updated: string;
}

export type Producers = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  SensorProducer: SensorProducer;
};

interface SensorProducer {
  id: number;
  sensor_id: number;
  producer_id: number;
  createdAt: string;
  updatedAt: string;
}
