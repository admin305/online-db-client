import React, { useCallback, useEffect, useState } from 'react';
import theme from 'theme';

import { mainApi } from 'modules/main/services/MainApi';

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

interface AddSensorProps {}

const AddSensor: React.FC<AddSensorProps> = () => {
  const [createSensor] = mainApi.useCreateSensorMutation();

  const deviceTypes = useAppSelector((state) => state.deviceTypeSlice.types);
  const sensetiveElements = useAppSelector(
    (state) => state.sensitiveElementSlice.sensitiveElements,
  );
  const operationPrinciples = useAppSelector((state) => state.operationPrincipleSlice.principles);
  const outputSignals = useAppSelector((state) => state.outputSignalSlice.outputSignals);
  const signalConversations = useAppSelector(
    (state) => state.signalConversationSlice.signalConversations,
  );
  const manufacturingsTechnologys = useAppSelector(
    (state) => state.manufacturingTechnologySlice.manufacturingTechnologys,
  );
  const producers = useAppSelector((state) => state.producerSlice.producers);
  const literatures = useAppSelector((state) => state.literatureSlice.literatures);
  const environments = useAppSelector((state) => state.environmentSlice.environments);
  const applicationSpheres = useAppSelector(
    (state) => state.applicationSphereSlice.applicationSpheres,
  );

  const [sensor, setSensor] = useState(initialSensorState);
  const [isError, setIsError] = useState(false);

  const handleAddSensor = () => {
    if (sensor.name.length === 0) {
      setIsError(true);
      return;
    }

    setIsError(false);
    createSensor(sensor);
    setSensor(initialSensorState);
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
              defaultValue={sensor.name}
              onChange={(name) => setSensor((prev) => ({ ...prev, name }))}
              placeholder="Наименование"
              withBorder
              error={isError ? IS_OBLIGATORY_FIELD_ERROR : null}
            />
          </SInputContainer>
        </SHeaderContent>
        <SHeaderButtonContainer>
          <Button
            onClick={handleAddSensor}
            color={theme.colors.white}
            backgroundColor={theme.colors.blue}
            hoverBackground={theme.colors.darkBlue}>
            Добавить информацию
          </Button>
        </SHeaderButtonContainer>
      </SSensorHeader>
      <Spacer height={10} />
      <SSensorContent>
        <Spacer height={10} />

        <SParamContainer>
          <SParamsLeftSide>
            <BaseParamForm
              sensetiveElements={sensetiveElements}
              operationPrinciples={operationPrinciples}
              outputSignals={outputSignals}
              signalConversations={signalConversations}
              deviceTypes={deviceTypes}
              manufacturingsTechnologys={manufacturingsTechnologys}
              errorRateValue={String(sensor.measurement_error)}
              onChange={setSensor}
            />

            <Spacer height={20} />

            <Typography fontSize={theme.fontSizes.lg} fontWeight={500}>
              Диапозон измерений
            </Typography>

            <Spacer height={10} />

            <InputField
              defaultValue={String(sensor.measure_min)}
              label="Нижняя граница измерений"
              onChange={(value) => setSensor((prev) => ({ ...prev, measure_min: Number(value) }))}
              placeholder="Нижняя граница измерений"
              type="number"
            />

            <Spacer height={10} />

            <InputField
              defaultValue={String(sensor.measure_max)}
              label="Верхняя граница измерений"
              onChange={(value) => setSensor((prev) => ({ ...prev, measure_max: Number(value) }))}
              placeholder="Верхняя граница измерений"
              type="number"
            />

            <Spacer height={10} />

            <InputField
              defaultValue={sensor.unit_of_measuring}
              label="Единица измерения величины"
              onChange={(value) => setSensor((prev) => ({ ...prev, unit_of_measuring: value }))}
              placeholder="Единица измерения величины"
            />

            <Spacer height={20} />

            <Typography fontSize={theme.fontSizes.lg} fontWeight={500}>
              Габаритные размеры и вес
            </Typography>

            <Spacer height={10} />

            <InputField
              defaultValue={String(sensor.length)}
              label="Длина"
              onChange={(value) => setSensor((prev) => ({ ...prev, length: Number(value) }))}
              placeholder="Длина"
              type="number"
            />

            <Spacer height={10} />

            <InputField
              defaultValue={String(sensor.width)}
              label="Ширина"
              onChange={(value) => setSensor((prev) => ({ ...prev, length: Number(value) }))}
              placeholder="Ширина"
              type="number"
            />

            <Spacer height={10} />

            <InputField
              defaultValue={String(sensor.height)}
              label="Высота"
              onChange={(value) => setSensor((prev) => ({ ...prev, height: Number(value) }))}
              placeholder="Высота"
              type="number"
            />

            <Spacer height={10} />

            <InputField
              defaultValue={String(sensor.diameter)}
              label="Диаметр"
              onChange={(value) => setSensor((prev) => ({ ...prev, diameter: Number(value) }))}
              placeholder="Диаметр"
              type="number"
            />

            <Spacer height={10} />

            <InputField
              defaultValue={sensor.unit_of_length}
              label="Единица измерения длины"
              onChange={(value) => setSensor((prev) => ({ ...prev, unit_of_length: value }))}
              placeholder="Единица измерения длины"
            />

            <Spacer height={10} />

            <InputField
              defaultValue={String(sensor.weight)}
              label="Вес"
              onChange={(value) => setSensor((prev) => ({ ...prev, weight: Number(value) }))}
              placeholder="Вес"
              type="number"
            />

            <Spacer height={10} />

            <InputField
              defaultValue={sensor.unit_of_weight}
              label="Единица измерения веса"
              onChange={(value) => setSensor((prev) => ({ ...prev, unit_of_weight: value }))}
              placeholder="Единица измерения веса"
            />

            <Spacer height={10} />
            <Dropdown
              options={producers}
              label="Производитель"
              labelColor={theme.colors.black}
              onChange={(event) => setSensor((prev) => ({ ...prev, producer: event.target.value }))}
            />

            <Spacer height={10} />
            <Dropdown
              options={literatures}
              label="Литература"
              labelColor={theme.colors.black}
              onChange={(event) =>
                setSensor((prev) => ({ ...prev, literature: event.target.value }))
              }
            />

            <Spacer height={10} />
            <Dropdown
              options={environments}
              label="Среда измерения"
              labelColor={theme.colors.black}
              onChange={(event) =>
                setSensor((prev) => ({ ...prev, environment: event.target.value }))
              }
            />

            <Spacer height={10} />
            <Dropdown
              options={applicationSpheres}
              label="Область применения"
              labelColor={theme.colors.black}
              onChange={(event) =>
                setSensor((prev) => ({ ...prev, application_sphere: event.target.value }))
              }
            />
          </SParamsLeftSide>

          <Spacer marginRight={50} />

          <SParamsRightSide>
            <Typography fontSize={theme.fontSizes.lg} fontWeight={500}>
              Описание
            </Typography>

            <Spacer height={20} />

            <STextareaContainer>
              <Textarea
                defaultValue={sensor.description}
                onChange={(value) => setSensor((prev) => ({ ...prev, description: value }))}
              />
            </STextareaContainer>

            <Spacer height={20} />

            <Typography fontSize={theme.fontSizes.lg} fontWeight={500}>
              Диапозон температур окружающей среды
            </Typography>

            <Spacer height={10} />

            <InputField
              defaultValue={String(sensor.lower_temperature_threshold)}
              label="Минимальная температура"
              onChange={(value) =>
                setSensor((prev) => ({ ...prev, lower_temperature_threshold: Number(value) }))
              }
              placeholder="Минимальная температура"
              type="number"
            />

            <Spacer height={10} />

            <InputField
              defaultValue={String(sensor.upper_temperature_threshold)}
              label="Максимальная температура"
              onChange={(value) =>
                setSensor((prev) => ({ ...prev, upper_temperature_threshold: Number(value) }))
              }
              placeholder="Максимальная температура"
              type="number"
            />

            <Spacer height={10} />

            <InputField
              defaultValue={sensor.temperature_unit}
              label="Единица измерения температуры"
              onChange={(value) => setSensor((prev) => ({ ...prev, temperature_unit: value }))}
              placeholder="Единица измерения температуры"
            />

            <Spacer height={20} />

            <Typography fontSize={theme.fontSizes.lg} fontWeight={500}>
              Дополнительно
            </Typography>

            <Spacer height={10} />

            <InputField
              defaultValue={sensor.power}
              label="Питание (Вольт)"
              onChange={(value) => setSensor((prev) => ({ ...prev, power: value }))}
              placeholder="Питание (Вольт)"
            />

            <Spacer height={10} />

            <InputField
              defaultValue={sensor.protection_class}
              label="Класс защиты"
              onChange={(value) => setSensor((prev) => ({ ...prev, protection_class: value }))}
              placeholder="Класс защиты"
            />

            <Spacer height={10} />

            <InputField
              type="number"
              defaultValue={String(sensor.resource)}
              label="Ресурс работы (Часы)"
              onChange={(value) => setSensor((prev) => ({ ...prev, resource: Number(value) }))}
              placeholder="Ресурс работы (Часы)"
            />

            <Spacer height={10} />

            <InputField
              type="number"
              defaultValue={String(sensor.measuring_channels)}
              label="Количество измерительных каналов"
              onChange={(value) =>
                setSensor((prev) => ({ ...prev, measuring_channels: Number(value) }))
              }
              placeholder="Количество измерительных каналов"
            />

            <Spacer height={20} />

            <Typography fontSize={theme.fontSizes.lg} fontWeight={500}>
              Динамические характеристики
            </Typography>

            <Spacer height={10} />

            <InputField
              type="number"
              defaultValue={String(sensor.dynamic_shift_factor)}
              label="Коэффициент смещения"
              onChange={(value) =>
                setSensor((prev) => ({ ...prev, dynamic_shift_factor: Number(value) }))
              }
              placeholder="Коэффициент смещения"
            />

            <Spacer height={10} />

            <InputField
              type="number"
              defaultValue={String(sensor.dynamic_static_sensitivity)}
              label="Коэффициент статической чувствительности"
              onChange={(value) =>
                setSensor((prev) => ({ ...prev, dynamic_static_sensitivity: Number(value) }))
              }
              placeholder="Коэффициент статической чувствительности"
            />

            <Spacer height={10} />

            <InputField
              type="number"
              defaultValue={String(sensor.dynamic_damping_factor)}
              label="Коэффициент демпфирования"
              onChange={(value) =>
                setSensor((prev) => ({ ...prev, dynamic_static_sensitivity: Number(value) }))
              }
              placeholder="Коэффициент демпфирования"
            />

            <Spacer height={10} />

            <InputField
              type="number"
              defaultValue={String(sensor.dynamic_time_constant)}
              label="Постоянная времени (сек)"
              onChange={(value) =>
                setSensor((prev) => ({ ...prev, dynamic_time_constant: Number(value) }))
              }
              placeholder="Постоянная времени (сек)"
            />

            <Spacer height={10} />

            <InputField
              type="number"
              defaultValue={String(sensor.dynamic_warm_up_time)}
              label="Время разогрева"
              onChange={(value) =>
                setSensor((prev) => ({ ...prev, dynamic_warm_up_time: Number(value) }))
              }
              placeholder="Время разогрева"
            />

            <Spacer height={10} />

            <InputField
              type="number"
              defaultValue={String(sensor.dynamic_cutoff_frequency_min)}
              label="Минимальная частота среза (Герц)"
              onChange={(value) =>
                setSensor((prev) => ({ ...prev, dynamic_cutoff_frequency_min: Number(value) }))
              }
              placeholder="Минимальная частота среза (Герц)"
            />

            <Spacer height={10} />

            <InputField
              type="number"
              defaultValue={String(sensor.dynamic_cutoff_frequency_max)}
              label="Максимальная частота среза (Герц)"
              onChange={(value) =>
                setSensor((prev) => ({ ...prev, dynamic_cutoff_frequency_max: Number(value) }))
              }
              placeholder="Максимальная частота среза (Герц)"
            />

            <Spacer height={10} />

            <InputField
              type="number"
              defaultValue={String(sensor.dynamic_resonant_frequency)}
              label="Резонансная частота (Герц)"
              onChange={(value) =>
                setSensor((prev) => ({ ...prev, dynamic_resonant_frequency: Number(value) }))
              }
              placeholder="Резонансная частота (Герц)"
            />

            <Spacer height={10} />

            <InputField
              type="number"
              defaultValue={String(sensor.dynamic_error)}
              label="Динамическая погрешность (%)"
              onChange={(value) => setSensor((prev) => ({ ...prev, dynamic_error: Number(value) }))}
              placeholder="Динамическая погрешность (%)"
            />

            <Spacer height={10} />

            <STextareaContainer>
              <Textarea
                defaultValue={sensor.dynamic_description}
                onChange={(value) => setSensor((prev) => ({ ...prev, dynamic_description: value }))}
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

export default AddSensor;
