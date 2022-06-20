import React, { useEffect, useState } from 'react';
import { Transition } from 'react-transition-group';
import theme from 'theme';

import styled from 'styled-components';

import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import Spacer from 'components/Spacer';
import Dropdown from 'components/Dropdown';
import InputField from 'components/InputField';
import Typography from 'components/Typography';
import SearchIcon from 'components/icons/SearchIcon';
import CloseIcon from 'components/icons/CloseIcon';

import MainSearch from './MainSearch';
import { Device, Sensor, ViewType } from '../types';
import { useAppSelector } from 'hooks/redux';
import { stringify } from 'querystring';

interface MainSidebarFiltersProps {
  sensorData: Sensor[];
  filterSensorData: Sensor[];
  deviceData: Device[];
  filterDeviceData: Device[];
  isActive: boolean;
  isSensorSearchActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  setFilterSensorData: React.Dispatch<React.SetStateAction<Sensor[]>>;
  setFilterDeviceData: React.Dispatch<React.SetStateAction<Device[]>>;
}

interface SensorFilters {
  measurement_error: number;
  measure_max: number;
  measure_min: number;
  unit_of_measuring: string;
  resource: number;
  lower_temperature_threshold: number;
  upper_temperature_threshold: number;
  temperature_unit: string;
  length: number;
  height: number;
  width: number;
  unit_of_length: string;
  weight: number;
  unit_of_weight: string;
  protection_class: string;
  power: string;
  measuring_channels: number;
  type: string;
  operation_principle: string;
  manufacturing_technology: string;
  sensitive_element: string;
  output_signal: string;
  signal_conversation: string;
}

type DeviceFilters = Omit<
  SensorFilters,
  'sensitive_element' | 'output_signal' | 'signal_conversation'
> & {
  purpose: string;
  control_type: string;
};

const DROPDOWN_DEFAULT_VALUE = 'Не выбрано';

const DEFAULT_SENSOR_FILTERS: SensorFilters = {
  measurement_error: 0,
  measure_max: 0,
  measure_min: 0,
  unit_of_measuring: '',
  resource: 0,
  lower_temperature_threshold: 0,
  upper_temperature_threshold: 0,
  temperature_unit: '',
  length: 0,
  height: 0,
  width: 0,
  unit_of_length: '',
  weight: 0,
  unit_of_weight: '',
  protection_class: '',
  power: '',
  measuring_channels: 0,
  type: DROPDOWN_DEFAULT_VALUE,
  operation_principle: DROPDOWN_DEFAULT_VALUE,
  manufacturing_technology: DROPDOWN_DEFAULT_VALUE,
  sensitive_element: DROPDOWN_DEFAULT_VALUE,
  output_signal: DROPDOWN_DEFAULT_VALUE,
  signal_conversation: DROPDOWN_DEFAULT_VALUE,
};

const DEFAULT_DEVICE_FILTERS: DeviceFilters = {
  measurement_error: 0,
  measure_max: 0,
  measure_min: 0,
  unit_of_measuring: '',
  resource: 0,
  lower_temperature_threshold: 0,
  upper_temperature_threshold: 0,
  temperature_unit: '',
  length: 0,
  height: 0,
  width: 0,
  unit_of_length: '',
  weight: 0,
  unit_of_weight: '',
  protection_class: '',
  power: '',
  measuring_channels: 0,
  type: DROPDOWN_DEFAULT_VALUE,
  operation_principle: DROPDOWN_DEFAULT_VALUE,
  manufacturing_technology: DROPDOWN_DEFAULT_VALUE,
  purpose: DROPDOWN_DEFAULT_VALUE,
  control_type: DROPDOWN_DEFAULT_VALUE,
};

const MainSidebarFilters: React.FC<MainSidebarFiltersProps> = ({
  sensorData,
  filterSensorData,
  deviceData,
  filterDeviceData,
  isActive,
  isSensorSearchActive,
  setIsActive,
  setFilterSensorData,
  setFilterDeviceData,
}) => {
  const types = useAppSelector((state) => state.deviceTypeSlice.types);
  const operationPrinciples = useAppSelector((state) => state.operationPrincipleSlice.principles);
  const manufTechs = useAppSelector(
    (state) => state.manufacturingTechnologySlice.manufacturingTechnologys,
  );
  const sensetiveElements = useAppSelector(
    (state) => state.sensitiveElementSlice.sensitiveElements,
  );
  const outputSignals = useAppSelector((state) => state.outputSignalSlice.outputSignals);
  const signalConversations = useAppSelector(
    (state) => state.signalConversationSlice.signalConversations,
  );
  const purposes = useAppSelector((state) => state.purposeSlice.purposes);
  const controlTypes = useAppSelector((state) => state.controlTypeSlice.controlTypes);

  const [sensorFilters, setSensorFilters] = useState<SensorFilters>(DEFAULT_SENSOR_FILTERS);
  const [deviceFilters, setDeviceFilters] = useState<DeviceFilters>(DEFAULT_DEVICE_FILTERS);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleSetFilters = () => {
    const type = types.find((item) => item.name === sensorFilters.type);
    const operationPrinciple = operationPrinciples.find(
      (item) => item.name === sensorFilters.operation_principle,
    );
    const manufTech = manufTechs.find(
      (item) => item.name === sensorFilters.manufacturing_technology,
    );
    const sensetiveElement = sensetiveElements.find(
      (item) => item.name === sensorFilters.sensitive_element,
    );
    const outputSignal = outputSignals.find((item) => item.name === sensorFilters.output_signal);
    const signalConversation = signalConversations.find(
      (item) => item.name === sensorFilters.signal_conversation,
    );

    const purpose = purposes.find((item) => item.name === deviceFilters.purpose);
    const controlType = controlTypes.find((item) => item.name === deviceFilters.control_type);

    const sensors = ([] as Partial<Sensor>[]).concat(
      manufTech ? manufTech.sensors : [],
      sensetiveElement ? sensetiveElement.sensors : [],
      operationPrinciple ? operationPrinciple.sensors : [],
      outputSignal ? outputSignal.sensors : [],
      type ? type.sensors : [],
      signalConversation ? signalConversation.sensors : [],
    );

    const devices = ([] as Partial<Device>[]).concat(
      manufTech ? manufTech.devices : [],
      operationPrinciple ? operationPrinciple.devices : [],
      type ? type.devices : [],
      purpose ? purpose.devices : [],
      controlType ? controlType.devices : [],
    );

    const filterWithouRepeatSensorsData =
      sensors.length === 0
        ? sensorData
        : sensors.reduce((res: Partial<Sensor>[], item: Partial<Sensor>, index) => {
            if (index === 0) {
              return [item];
            }

            const repeatedItemArray = res.filter((el) => el.id === item.id);

            return repeatedItemArray.length === 0 ? [...res, item] : res;
          }, []);

    const filterWithouRepeatDeviceData = devices.reduce(
      (res: Partial<Device>[], item: Partial<Device>, index) => {
        if (index === 0) {
          return [item];
        }

        const repeatedItemArray = res.filter((el) => el.id === item.id);

        return repeatedItemArray.length === 0 ? [...res, item] : res;
      },
      [],
    );

    // вынести в отдельную функцию
    // const sensorFilteredData = filterWithouRepeatSensorsData.filter(
    //   (item) =>
    //     item.unit_of_measuring === sensorFilters.unit_of_measuring &&
    //     item.temperature_unit === sensorFilters.temperature_unit &&
    //     item.protection_class === sensorFilters.protection_class &&
    //     item.measurement_error === sensorFilters.measurement_error &&
    //     item.measure_max === sensorFilters.measure_max &&
    //     item.measure_min === sensorFilters.measure_min &&
    //     item.resource === sensorFilters.resource &&
    //     item.lower_temperature_threshold === sensorFilters.lower_temperature_threshold &&
    //     item.upper_temperature_threshold === sensorFilters.upper_temperature_threshold &&
    //     item.length === sensorFilters.length &&
    //     item.height === sensorFilters.height &&
    //     item.width === sensorFilters.width &&
    //     item.unit_of_length === sensorFilters.unit_of_length &&
    //     item.weight === sensorFilters.weight &&
    //     item.unit_of_weight === sensorFilters.unit_of_weight &&
    //     item.protection_class === sensorFilters.protection_class &&
    //     item.power === sensorFilters.power &&
    //     item.measuring_channels === sensorFilters.measuring_channels,
    // );

    const deviceFilterData = filterWithouRepeatDeviceData.filter(
      (item) =>
        item.unit_of_measuring === sensorFilters.unit_of_measuring &&
        item.temperature_unit === sensorFilters.temperature_unit &&
        item.protection_class === sensorFilters.protection_class &&
        item.measurement_error === sensorFilters.measurement_error &&
        item.measure_max === sensorFilters.measure_max &&
        item.measure_min === sensorFilters.measure_min &&
        item.resource === sensorFilters.resource &&
        item.lower_temperature_threshold === sensorFilters.lower_temperature_threshold &&
        item.upper_temperature_threshold === sensorFilters.upper_temperature_threshold &&
        item.length === sensorFilters.length &&
        item.height === sensorFilters.height &&
        item.width === sensorFilters.width &&
        item.unit_of_length === sensorFilters.unit_of_length &&
        item.weight === sensorFilters.weight &&
        item.unit_of_weight === sensorFilters.unit_of_weight &&
        item.protection_class === sensorFilters.protection_class &&
        item.power === sensorFilters.power &&
        item.measuring_channels === sensorFilters.measuring_channels,
    );

    setFilterSensorData(
      filterWithouRepeatSensorsData.reduce((res: Sensor[], item) => {
        const findedItem = sensorData.find((sensor) => sensor.id === item.id);

        if (findedItem) {
          return [...res, findedItem];
        }

        return res;
      }, []),
    );

    console.log(
      deviceFilterData.reduce((res: Device[], item) => {
        const findedItem = deviceData.find((device) => device.id === item.id);

        if (findedItem) {
          return [...res, findedItem];
        }

        return res;
      }, []),
    );

    setFilterDeviceData(
      deviceFilterData.reduce((res: Device[], item) => {
        const findedItem = deviceData.find((device) => device.id === item.id);

        if (findedItem) {
          return [...res, findedItem];
        }

        return res;
      }, []),
    );
  };

  useEffect(() => {
    const test = ([] as Sensor[]).concat(sensorData, sensorData);
    const test2 = new Set(test);
    console.log(test, Array.from(test2));
  }, [sensorData]);

  useEffect(() => {
    setFilterSensorData(sensorData);
    setFilterDeviceData(deviceData);
  }, [deviceData, sensorData, setFilterSensorData, setFilterDeviceData]);

  return (
    <>
      <MainSearch
        isActive={isSearchActive}
        sensorData={filterSensorData}
        deviceData={filterDeviceData}
        isSensorSearchActive={isSensorSearchActive}
        setIsActive={setIsSearchActive}
      />
      <Transition in={isActive} timeout={500} mountOnEnter unmountOnExit>
        {(state) => (
          <SSidebar state={state}>
            <SSidebarContainer>
              <SCloseButton onClick={() => setIsActive(false)}>
                <CloseIcon fill={theme.colors.white} />
              </SCloseButton>
              <SButtonContainer>
                <Button
                  onClick={() => {
                    setFilterSensorData(sensorData);
                    setFilterDeviceData(deviceData);
                    setSensorFilters(DEFAULT_SENSOR_FILTERS);
                  }}
                  color={theme.colors.white}
                  backgroundColor={theme.colors.blue}>
                  Сбросить фильтры
                </Button>
                <Spacer marginRight={10} />
                <SSearchButton>
                  <Button
                    onClick={() => setIsSearchActive(true)}
                    color={theme.colors.white}
                    backgroundColor={theme.colors.blue}>
                    <SearchIcon />
                  </Button>
                </SSearchButton>
              </SButtonContainer>
              <Spacer height={25} />

              <SButtonContainer>
                <Button
                  onClick={() => handleSetFilters()}
                  color={theme.colors.white}
                  backgroundColor={theme.colors.blue}>
                  Применить фильтры
                </Button>
              </SButtonContainer>
              <Spacer height={25} />

              <Dropdown
                label="Тип датчика или прибора"
                options={types}
                defaultValue={sensorFilters.type}
                onChange={(event) => {
                  setSensorFilters((prev) => ({ ...prev, type: event.target.value }));
                  setDeviceFilters((prev) => ({ ...prev, type: event.target.value }));
                }}
              />
              <Spacer height={25} />
              <Typography color={theme.colors.white} fontSize={18} fontWeight={500}>
                Общие параметры
              </Typography>
              <Spacer height={25} />
              <InputField
                label="Погрешность измерения, %"
                labelColor={theme.colors.white}
                placeholder="Погрешность измерения, %"
                defaultValue={String(sensorFilters.measurement_error)}
                type="number"
                onChange={(value) =>
                  setSensorFilters((prev) => ({ ...prev, measurement_error: Number(value) }))
                }
              />
              <Spacer height={25} />
              <InputField
                label="Верхний диапазон измерений"
                labelColor={theme.colors.white}
                placeholder="Верхний диапазон измерений"
                defaultValue={String(sensorFilters.measure_max)}
                type="number"
                onChange={(value) =>
                  setSensorFilters((prev) => ({ ...prev, measure_max: Number(value) }))
                }
              />
              <Spacer height={25} />
              <InputField
                label="Нижний диапазон измерений"
                labelColor={theme.colors.white}
                placeholder="Нижний диапазон измерений"
                defaultValue={String(sensorFilters.measure_min)}
                type="number"
                onChange={(value) =>
                  setSensorFilters((prev) => ({ ...prev, measure_min: Number(value) }))
                }
              />
              <Spacer height={25} />
              <InputField
                label="Единица измерения величины"
                labelColor={theme.colors.white}
                placeholder="Единица измерения величины"
                defaultValue={sensorFilters.unit_of_measuring}
                onChange={(value) =>
                  setSensorFilters((prev) => ({ ...prev, unit_of_measuring: value }))
                }
              />
              <Spacer height={25} />
              <InputField
                label="Требуемый ресурс, ч"
                labelColor={theme.colors.white}
                placeholder="Требуемый ресурс, ч"
                type="number"
                defaultValue={String(sensorFilters.resource)}
                onChange={(value) =>
                  setSensorFilters((prev) => ({ ...prev, resource: Number(value) }))
                }
              />
              <Spacer height={25} />
              <InputField
                label="Верхний диапазон температур внешней среды"
                labelColor={theme.colors.white}
                placeholder="Верхний диапазон температур"
                type="number"
                defaultValue={String(sensorFilters.upper_temperature_threshold)}
                onChange={(value) =>
                  setSensorFilters((prev) => ({
                    ...prev,
                    upper_temperature_threshold: Number(value),
                  }))
                }
              />
              <Spacer height={25} />
              <InputField
                label="Нижний диапазон температур внешней среды"
                labelColor={theme.colors.white}
                placeholder="Нижний диапазон температур"
                type="number"
                defaultValue={String(sensorFilters.lower_temperature_threshold)}
                onChange={(value) =>
                  setSensorFilters((prev) => ({
                    ...prev,
                    lower_temperature_threshold: Number(value),
                  }))
                }
              />
              <Spacer height={25} />
              <InputField
                label="Единица измерения температуры внешней среды"
                labelColor={theme.colors.white}
                placeholder="Единица измерения температуры"
                defaultValue={sensorFilters.temperature_unit}
                onChange={(value) =>
                  setSensorFilters((prev) => ({ ...prev, temperature_unit: value }))
                }
              />
              <Spacer height={25} />
              <InputField
                label="Максимальная длина"
                labelColor={theme.colors.white}
                placeholder="Максимальная длина"
                type="number"
                defaultValue={String(sensorFilters.length)}
                onChange={(value) =>
                  setSensorFilters((prev) => ({
                    ...prev,
                    length: Number(value),
                  }))
                }
              />
              <Spacer height={25} />
              <InputField
                label="Максимальная высота"
                labelColor={theme.colors.white}
                placeholder="Максимальная высота"
                type="number"
                defaultValue={String(sensorFilters.height)}
                onChange={(value) =>
                  setSensorFilters((prev) => ({
                    ...prev,
                    height: Number(value),
                  }))
                }
              />
              <Spacer height={25} />
              <InputField
                label="Максимальная ширина"
                labelColor={theme.colors.white}
                placeholder="Максимальная ширина"
                type="number"
                defaultValue={String(sensorFilters.width)}
                onChange={(value) =>
                  setSensorFilters((prev) => ({
                    ...prev,
                    width: Number(value),
                  }))
                }
              />
              <Spacer height={25} />
              <InputField
                label="Единица измерения длины"
                labelColor={theme.colors.white}
                placeholder="Единица измерения длины"
                defaultValue={sensorFilters.unit_of_length}
                onChange={(value) =>
                  setSensorFilters((prev) => ({ ...prev, unit_of_length: value }))
                }
              />
              <Spacer height={25} />
              <InputField
                label="Максимальный вес"
                labelColor={theme.colors.white}
                placeholder="Максимальный вес"
                type="number"
                defaultValue={String(sensorFilters.weight)}
                onChange={(value) =>
                  setSensorFilters((prev) => ({
                    ...prev,
                    weight: Number(value),
                  }))
                }
              />
              <Spacer height={25} />
              <InputField
                label="Единица измерения веса"
                labelColor={theme.colors.white}
                placeholder="Единица измерения веса"
                defaultValue={sensorFilters.unit_of_weight}
                onChange={(value) =>
                  setSensorFilters((prev) => ({ ...prev, unit_of_weight: value }))
                }
              />
              <Spacer height={25} />
              <InputField
                label="Питание (Вольт)"
                labelColor={theme.colors.white}
                placeholder="Питание"
                defaultValue={sensorFilters.power}
                onChange={(value) => setSensorFilters((prev) => ({ ...prev, power: value }))}
              />
              <Spacer height={25} />
              <InputField
                label="Класс защиты"
                labelColor={theme.colors.white}
                placeholder="Класс защиты"
                defaultValue={sensorFilters.protection_class}
                onChange={(value) =>
                  setSensorFilters((prev) => ({ ...prev, protection_class: value }))
                }
              />
              <Spacer height={25} />
              <Dropdown
                options={operationPrinciples}
                label="Принцип действия"
                labelColor={theme.colors.white}
                defaultValue={sensorFilters.operation_principle}
                onChange={(event) => {
                  setSensorFilters((prev) => ({
                    ...prev,
                    operation_principle: event.target.value,
                  }));
                  setDeviceFilters((prev) => ({
                    ...prev,
                    operation_principle: event.target.value,
                  }));
                }}
              />

              <Spacer height={25} />
              <Dropdown
                options={manufTechs}
                label="Технология изготовления"
                labelColor={theme.colors.white}
                defaultValue={sensorFilters.manufacturing_technology}
                onChange={(event) => {
                  setSensorFilters((prev) => ({
                    ...prev,
                    manufacturing_technology: event.target.value,
                  }));
                  setDeviceFilters((prev) => ({
                    ...prev,
                    manufacturing_technology: event.target.value,
                  }));
                }}
              />

              <Spacer height={25} />

              {isSensorSearchActive ? (
                <>
                  <Typography color={theme.colors.white} fontSize={18} fontWeight={500}>
                    Параметры датчиков
                  </Typography>
                  <Spacer height={25} />
                  <Dropdown
                    options={sensetiveElements}
                    label="Чувствительный элемент"
                    labelColor={theme.colors.white}
                    defaultValue={sensorFilters.sensitive_element}
                    onChange={(event) =>
                      setSensorFilters((prev) => ({
                        ...prev,
                        sensitive_element: event.target.value,
                      }))
                    }
                  />
                  <Spacer height={25} />
                  <Dropdown
                    options={outputSignals}
                    label="Характер выходного сигнала"
                    labelColor={theme.colors.white}
                    defaultValue={sensorFilters.output_signal}
                    onChange={(event) =>
                      setSensorFilters((prev) => ({
                        ...prev,
                        output_signal: event.target.value,
                      }))
                    }
                  />
                  <Spacer height={25} />
                  <Dropdown
                    options={signalConversations}
                    label="Характер преобразования сигнала"
                    labelColor={theme.colors.white}
                    defaultValue={sensorFilters.signal_conversation}
                    onChange={(event) =>
                      setSensorFilters((prev) => ({
                        ...prev,
                        signal_conversation: event.target.value,
                      }))
                    }
                  />
                  <Spacer height={25} />
                  <InputField
                    label="Количество измерительных каналов"
                    labelColor={theme.colors.white}
                    placeholder="Количество каналов"
                    type="number"
                    defaultValue={String(sensorFilters.measuring_channels)}
                    onChange={(value) =>
                      setSensorFilters((prev) => ({ ...prev, measuring_channels: Number(value) }))
                    }
                  />
                </>
              ) : (
                <>
                  <Typography color={theme.colors.white} fontSize={18} fontWeight={500}>
                    Параметры приборов
                  </Typography>
                  <Spacer height={25} />
                  <Dropdown
                    options={purposes}
                    label="Назначение прибора"
                    labelColor={theme.colors.white}
                    defaultValue={deviceFilters.purpose}
                    onChange={(event) =>
                      setDeviceFilters((prev) => ({
                        ...prev,
                        purpose: event.target.value,
                      }))
                    }
                  />

                  <Spacer height={25} />
                  <Dropdown
                    options={controlTypes}
                    label="Способ управления"
                    labelColor={theme.colors.white}
                    defaultValue={deviceFilters.control_type}
                    onChange={(event) =>
                      setDeviceFilters((prev) => ({
                        ...prev,
                        control_type: event.target.value,
                      }))
                    }
                  />

                  {/* <Spacer height={25} />
                  <Dropdown
                    options={[]}
                    label="Способ воспроизведения измеряемой величины"
                    labelColor={theme.colors.white}
                    onChange={() => console.log('')}
                  /> */}

                  {/* <Spacer height={25} />
                  <InputField
                    label="Выходное напряжение"
                    labelColor={theme.colors.white}
                    placeholder="Выходное напряжение"
                    defaultValue=""
                    onChange={() => console.log('')}
                  />
                  <Spacer height={25} />
                  <InputField
                    label="Входное сопротивление"
                    labelColor={theme.colors.white}
                    placeholder="Входное сопротивление"
                    defaultValue=""
                    onChange={() => console.log('')}
                  />
                  <Spacer height={25} />
                  <InputField
                    label="Выходное сопротивление"
                    labelColor={theme.colors.white}
                    placeholder="Выходное сопротивление"
                    defaultValue=""
                    onChange={() => console.log('')}
                  /> */}
                </>
              )}
            </SSidebarContainer>
          </SSidebar>
        )}
      </Transition>
    </>
  );
};

const SSidebar = styled.div<{ state: string }>`
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  align-items: flex-start;
  justify-content: center;

  width: 15%;
  height: 100%;
  overflow: auto;

  color: ${theme.colors.white};
  background: ${theme.colors.sideDarkBlue};

  transition: 0.5s;
  transform: translateX(
    ${({ state }) => {
      switch (state) {
        case 'entering':
          return -400;
        case 'entered':
          return 0;
        case 'exiting':
          return -400;
        case 'exited':
          return 0;
      }
    }}px
  );
`;

const SSidebarContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;

  width: 100%;
  top: 100%;
  padding: 50px 10px;
`;

const SButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 40px;
`;

const SSearchButton = styled.div`
  width: 40px;
  height: 100%;
`;

const SCloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;

  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`;

export default MainSidebarFilters;
