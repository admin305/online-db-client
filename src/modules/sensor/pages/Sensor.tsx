import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import theme from 'theme';

import { mainApi } from 'modules/main/services/MainApi';
import { getSensor } from 'modules/main/services/MainSlice';

import styled from 'styled-components';

import Typography from 'components/Typography';
import Spacer from 'components/Spacer';
import InputField from 'components/InputField';
import Button from 'components/Button';
import Dropdown from 'components/Dropdown';
import Textarea from 'components/Textarea';
import GetInfoList from 'components/GetInfoList';
import { useAppSelector } from 'hooks/redux';
import { CreateSensorPayload } from 'modules/main/types';
import { IS_OBLIGATORY_FIELD_ERROR } from 'types';
import BaseParamForm from '../components/BaseParamForm';

const initialSensorState: CreateSensorPayload = {
  name: '',
  height: 0,
  width: 0,
  length: 0,
  diameter: 0,
  unit_of_length: '',
  weight: 0,
  unit_of_weight: '',
  measure_min: 0,
  measure_max: 0,
  unit_of_measuring: '',
  measurement_error: 0,
  output: '',
  power: '',
  protection_class: '',
  temperature_unit: '',
  blueprint: '',
  description: '',
  scheme: '',
  measuring_channels: 0,
  lower_temperature_threshold: 0,
  upper_temperature_threshold: 0,
  measure_min_temp: '',
  measure_max_temp: '',
  resource: 0,
  dynamic_warm_up_time: 0,
  din_t_heat_ed: '',
  dynamic_shift_factor: 0,
  dynamic_time_constant: 0,
  dynamic_cutoff_frequency_min: 0,
  dynamic_cutoff_frequency_max: 0,
  dynamic_resonant_frequency: 0,
  dynamic_damping_factor: 0,
  dynamic_static_sensitivity: 0,
  dynamic_description: '',
  dynamic_error: 0,
  device: '',
  application_sphere: '',
  environment: '',
  literature: '',
  measurable_value: '',
  type: '',
  signal_conversation: '',
  output_signal: '',
  manufacturing_technology: '',
  producer: '',
  operation_principle: '',
  sensitive_element: '',
};

interface SensorProps {}

interface LocationState {
  id: number;
}

const Sensor: React.FC<SensorProps> = () => {
  const location = useLocation();
  const { id } = location.state as LocationState;
  const sensors = useAppSelector((state) => state.mainSlice.sensors);
  const sensor = getSensor(sensors, id);

  const [sensorValue, setSensorValue] = useState(sensor[0]);
  const [isError, setIsError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleAddSensor = () => {
    if (sensorValue.name.length === 0) {
      setIsError(true);
      return;
    }
    // setIsError(false);
  };

  return (
    <SSensor>
      <SSensorHeader>
        <SHeaderContent>
          <Typography fontSize={theme.fontSizes.xxl} fontWeight={500}>
            Датчик
          </Typography>
          <Spacer marginRight={40} />
          <SInputContainer>
            <InputField
              defaultValue={sensorValue.name}
              onChange={(name) => setSensorValue((prev) => ({ ...prev, name }))}
              placeholder="Наименование"
              withBorder
              error={isError ? IS_OBLIGATORY_FIELD_ERROR : null}
              disabled={isDisabled}
            />
          </SInputContainer>
        </SHeaderContent>
        {/* <SHeaderButtonContainer>
          <Button
            onClick={handleAddSensor}
            color={theme.colors.white}
            backgroundColor={theme.colors.blue}
            hoverBackground={theme.colors.darkBlue}>
            Добавить информацию
          </Button>
        </SHeaderButtonContainer> */}
      </SSensorHeader>
      <Spacer height={10} />
      <SSensorContent>
        <Spacer height={10} />

        <SParamContainer>
          <SParamsLeftSide>
            {/* <BaseParamForm
              sensetiveElements={sensetiveElements}
              operationPrinciples={operationPrinciples}
              outputSignals={outputSignals}
              signalConversations={signalConversations}
              deviceTypes={deviceTypes}
              manufacturingsTechnologys={manufacturingsTechnologys}
              errorRateValue={String(sensor.measurement_error)}
              onChange={setSensor}
            /> */}

            <Spacer height={20} />

            <Typography fontSize={theme.fontSizes.lg} fontWeight={500}>
              Диапозон измерений
            </Typography>

            <Spacer height={10} />

            <InputField
              defaultValue={String(sensorValue.measure_min)}
              label="Нижняя граница измерений"
              onChange={(value) =>
                setSensorValue((prev) => ({ ...prev, measure_min: Number(value) }))
              }
              disabled={isDisabled}
              placeholder="Нижняя граница измерений"
              type="number"
            />

            <Spacer height={10} />

            <InputField
              defaultValue={String(sensorValue.measure_max)}
              label="Верхняя граница измерений"
              onChange={(value) =>
                setSensorValue((prev) => ({ ...prev, measure_max: Number(value) }))
              }
              placeholder="Верхняя граница измерений"
              type="number"
              disabled={isDisabled}
            />

            <Spacer height={10} />

            <InputField
              defaultValue={sensorValue.unit_of_measuring}
              label="Единица измерения величины"
              onChange={(value) =>
                setSensorValue((prev) => ({ ...prev, unit_of_measuring: value }))
              }
              placeholder="Единица измерения величины"
              disabled={isDisabled}
            />

            <Spacer height={20} />

            <Typography fontSize={theme.fontSizes.lg} fontWeight={500}>
              Габаритные размеры и вес
            </Typography>

            <Spacer height={10} />

            <InputField
              defaultValue={String(sensorValue.length)}
              label="Длина"
              onChange={(value) => setSensorValue((prev) => ({ ...prev, length: Number(value) }))}
              placeholder="Длина"
              type="number"
              disabled={isDisabled}
            />

            <Spacer height={10} />

            <InputField
              defaultValue={String(sensorValue.width)}
              label="Ширина"
              onChange={(value) => setSensorValue((prev) => ({ ...prev, length: Number(value) }))}
              placeholder="Ширина"
              type="number"
              disabled={isDisabled}
            />

            <Spacer height={10} />

            <InputField
              defaultValue={String(sensorValue.height)}
              label="Высота"
              onChange={(value) => setSensorValue((prev) => ({ ...prev, height: Number(value) }))}
              placeholder="Высота"
              type="number"
              disabled={isDisabled}
            />

            <Spacer height={10} />

            <InputField
              defaultValue={String(sensorValue.diameter)}
              label="Диаметр"
              onChange={(value) => setSensorValue((prev) => ({ ...prev, diameter: Number(value) }))}
              placeholder="Диаметр"
              type="number"
              disabled={isDisabled}
            />

            <Spacer height={10} />

            <InputField
              defaultValue={sensorValue.unit_of_length}
              label="Единица измерения длины"
              onChange={(value) => setSensorValue((prev) => ({ ...prev, unit_of_length: value }))}
              placeholder="Единица измерения длины"
              disabled={isDisabled}
            />

            <Spacer height={10} />

            <InputField
              defaultValue={String(sensorValue.weight)}
              label="Вес"
              onChange={(value) => setSensorValue((prev) => ({ ...prev, weight: Number(value) }))}
              placeholder="Вес"
              type="number"
              disabled={isDisabled}
            />

            <Spacer height={10} />

            <InputField
              defaultValue={sensorValue.unit_of_weight}
              label="Единица измерения веса"
              onChange={(value) => setSensorValue((prev) => ({ ...prev, unit_of_weight: value }))}
              placeholder="Единица измерения веса"
              disabled={isDisabled}
            />

            {/* <Spacer height={10} />
            <Dropdown
              options={producers}
              label="Производитель"
              labelColor={theme.colors.black}
              onChange={(event) =>
                setSensorValue((prev) => ({ ...prev, producer: event.target.value }))
              }
            />

            <Spacer height={10} />
            <Dropdown
              options={literatures}
              label="Литература"
              labelColor={theme.colors.black}
              onChange={(event) =>
                setSensorValue((prev) => ({ ...prev, literature: event.target.value }))
              }
            />

            <Spacer height={10} />
            <Dropdown
              options={environments}
              label="Среда измерения"
              labelColor={theme.colors.black}
              onChange={(event) =>
                setSensorValue((prev) => ({ ...prev, environment: event.target.value }))
              }
            /> */}

            {/* <Spacer height={10} />
            <Dropdown
              options={applicationSpheres}
              label="Область применения"
              labelColor={theme.colors.black}
              onChange={(event) =>
                setSensorValue((prev) => ({ ...prev, application_sphere: event.target.value }))
              }
            /> */}
          </SParamsLeftSide>

          <Spacer marginRight={50} />

          <SParamsRightSide>
            <Typography fontSize={theme.fontSizes.lg} fontWeight={500}>
              Описание
            </Typography>

            <Spacer height={20} />

            <STextareaContainer>
              <Textarea
                defaultValue={sensorValue.description}
                onChange={(value) => setSensorValue((prev) => ({ ...prev, description: value }))}
              />
            </STextareaContainer>

            <Spacer height={20} />

            <Typography fontSize={theme.fontSizes.lg} fontWeight={500}>
              Диапозон температур окружающей среды
            </Typography>

            <Spacer height={10} />

            <InputField
              defaultValue={String(sensorValue.lower_temperature_threshold)}
              label="Минимальная температура"
              onChange={(value) =>
                setSensorValue((prev) => ({ ...prev, lower_temperature_threshold: Number(value) }))
              }
              placeholder="Минимальная температура"
              type="number"
              disabled={isDisabled}
            />

            <Spacer height={10} />

            <InputField
              defaultValue={String(sensorValue.upper_temperature_threshold)}
              label="Максимальная температура"
              onChange={(value) =>
                setSensorValue((prev) => ({ ...prev, upper_temperature_threshold: Number(value) }))
              }
              placeholder="Максимальная температура"
              type="number"
              disabled={isDisabled}
            />

            <Spacer height={10} />

            <InputField
              defaultValue={sensorValue.temperature_unit}
              label="Единица измерения температуры"
              onChange={(value) => setSensorValue((prev) => ({ ...prev, temperature_unit: value }))}
              placeholder="Единица измерения температуры"
              disabled={isDisabled}
            />

            <Spacer height={20} />

            <Typography fontSize={theme.fontSizes.lg} fontWeight={500}>
              Дополнительно
            </Typography>

            <Spacer height={10} />

            <InputField
              defaultValue={sensorValue.power}
              label="Питание (Вольт)"
              onChange={(value) => setSensorValue((prev) => ({ ...prev, power: value }))}
              placeholder="Питание (Вольт)"
              disabled={isDisabled}
            />

            <Spacer height={10} />

            <InputField
              defaultValue={sensorValue.protection_class}
              label="Класс защиты"
              onChange={(value) => setSensorValue((prev) => ({ ...prev, protection_class: value }))}
              placeholder="Класс защиты"
              disabled={isDisabled}
            />

            <Spacer height={10} />

            <InputField
              type="number"
              defaultValue={String(sensorValue.resource)}
              label="Ресурс работы (Часы)"
              onChange={(value) => setSensorValue((prev) => ({ ...prev, resource: Number(value) }))}
              placeholder="Ресурс работы (Часы)"
              disabled={isDisabled}
            />

            <Spacer height={10} />

            <InputField
              type="number"
              defaultValue={String(sensorValue.measuring_channels)}
              label="Количество измерительных каналов"
              onChange={(value) =>
                setSensorValue((prev) => ({ ...prev, measuring_channels: Number(value) }))
              }
              placeholder="Количество измерительных каналов"
              disabled={isDisabled}
            />

            <Spacer height={20} />

            <Typography fontSize={theme.fontSizes.lg} fontWeight={500}>
              Динамические характеристики
            </Typography>

            <Spacer height={10} />

            <InputField
              type="number"
              defaultValue={String(sensorValue.dynamic_shift_factor)}
              label="Коэффициент смещения"
              onChange={(value) =>
                setSensorValue((prev) => ({ ...prev, dynamic_shift_factor: Number(value) }))
              }
              placeholder="Коэффициент смещения"
              disabled={isDisabled}
            />

            <Spacer height={10} />

            <InputField
              type="number"
              defaultValue={String(sensorValue.dynamic_static_sensitivity)}
              label="Коэффициент статической чувствительности"
              onChange={(value) =>
                setSensorValue((prev) => ({ ...prev, dynamic_static_sensitivity: Number(value) }))
              }
              placeholder="Коэффициент статической чувствительности"
              disabled={isDisabled}
            />

            <Spacer height={10} />

            <InputField
              type="number"
              defaultValue={String(sensorValue.dynamic_damping_factor)}
              label="Коэффициент демпфирования"
              onChange={(value) =>
                setSensorValue((prev) => ({ ...prev, dynamic_static_sensitivity: Number(value) }))
              }
              placeholder="Коэффициент демпфирования"
              disabled={isDisabled}
            />

            <Spacer height={10} />

            <InputField
              type="number"
              defaultValue={String(sensorValue.dynamic_time_constant)}
              label="Постоянная времени (сек)"
              onChange={(value) =>
                setSensorValue((prev) => ({ ...prev, dynamic_time_constant: Number(value) }))
              }
              placeholder="Постоянная времени (сек)"
              disabled={isDisabled}
            />

            <Spacer height={10} />

            <InputField
              type="number"
              defaultValue={String(sensorValue.dynamic_warm_up_time)}
              label="Время разогрева"
              onChange={(value) =>
                setSensorValue((prev) => ({ ...prev, dynamic_warm_up_time: Number(value) }))
              }
              placeholder="Время разогрева"
              disabled={isDisabled}
            />

            <Spacer height={10} />

            <InputField
              type="number"
              defaultValue={String(sensorValue.dynamic_cutoff_frequency_min)}
              label="Минимальная частота среза (Герц)"
              onChange={(value) =>
                setSensorValue((prev) => ({ ...prev, dynamic_cutoff_frequency_min: Number(value) }))
              }
              placeholder="Минимальная частота среза (Герц)"
              disabled={isDisabled}
            />

            <Spacer height={10} />

            <InputField
              type="number"
              defaultValue={String(sensorValue.dynamic_cutoff_frequency_max)}
              label="Максимальная частота среза (Герц)"
              onChange={(value) =>
                setSensorValue((prev) => ({ ...prev, dynamic_cutoff_frequency_max: Number(value) }))
              }
              placeholder="Максимальная частота среза (Герц)"
              disabled={isDisabled}
            />

            <Spacer height={10} />

            <InputField
              type="number"
              defaultValue={String(sensorValue.dynamic_resonant_frequency)}
              label="Резонансная частота (Герц)"
              onChange={(value) =>
                setSensorValue((prev) => ({ ...prev, dynamic_resonant_frequency: Number(value) }))
              }
              placeholder="Резонансная частота (Герц)"
              disabled={isDisabled}
            />

            <Spacer height={10} />

            <InputField
              type="number"
              defaultValue={String(sensorValue.dynamic_error)}
              label="Динамическая погрешность (%)"
              onChange={(value) =>
                setSensorValue((prev) => ({ ...prev, dynamic_error: Number(value) }))
              }
              placeholder="Динамическая погрешность (%)"
              disabled={isDisabled}
            />

            <Spacer height={10} />

            <STextareaContainer>
              <Textarea
                defaultValue={sensorValue.dynamic_description}
                onChange={(value) =>
                  setSensorValue((prev) => ({ ...prev, dynamic_description: value }))
                }
                label="Дополнительные сведения"
              />
            </STextareaContainer>
          </SParamsRightSide>
        </SParamContainer>

        <Spacer height={60} />
      </SSensorContent>
    </SSensor>
  );
};

const SSensor = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;
  min-height: 100%;
`;

const SSensorHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 70%;
  height: 10%;
`;

const SHeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  width: 70%;
`;

const SInputContainer = styled.div`
  width: 50%;
`;

const SHeaderButtonContainer = styled.div`
  width: 20%;
  height: 45px;
`;

const SSensorContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;

  width: 100%;
  min-height: 90vh;
  padding-top: 40px;
  box-sizing: border-box;
  background: ${theme.colors.backgroundLightBlueColor};
`;

const SSensorListContainer = styled.div`
  width: 70%;
`;

const SParamContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  width: 70%;
`;

const SParamsRightSide = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;

  width: 50%;
`;

const STextareaContainer = styled.div`
  width: 100%;
  height: 200px;
`;

const SParamsLeftSide = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;

  width: 50%;
`;

export default Sensor;
