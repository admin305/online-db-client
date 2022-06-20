enum SensorType {
  absolutePressure = "Абсолютного давления",
  overpressure = "Избыточного давления",
  level = "Уровня",
  temperatures = "Температуры",
  expense = "Расхода",
  humidity = "Влажности",
  sizeAndThickness = "Размера и толщины",
  moving = "Перемещения",
  flowRates = "Скорости потока",
  acceleration = "Ускорения",
  magneticField = "Магнитного поля",
  tilt = "Наклона",
  positionsAndDistances = "Положения и расстояния",
  angleOfRotation = "Угла поворота",
}

export interface ISensor {
  mainSettings: {
    type: SensorType;
    measuredValue: string;
    sensorElement: string;
    operatingPrinciple: string;
    theNatureOfTheOutputSignal: string;
    theNatureOfTheSignalConversion: string;
    manufacturingTechnology: string;
    measurementError: number;
  };
  measuringRange: {
    lowerMeasurementLimit: number;
    upperMeasurementLimit: number;
    valueUnit: string;
  };
  dimensionsAndWeight: {
    length: number;
    width: number;
    height: number;
    diameter: number;
    lengthUnit: string;
    weight: number;
    weightUnit: string;
  };
  description: string;
  ambientTemperatureRange: {
    minTemp: number;
    maxTemp: number;
    tempUnit: string;
  };
}
