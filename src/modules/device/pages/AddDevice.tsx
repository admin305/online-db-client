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
import { CreateDevicePayload } from 'modules/main/types';
import { IS_OBLIGATORY_FIELD_ERROR } from 'types';
// import BaseParamForm from '../components/BaseParamForm';

const initialDeviceState: CreateDevicePayload = {
  name: '',
  in_resistance: '', // Добавить
  out_resistance: '', // Добавить
  output_voltage: '', // Добавить
  ad_running_time_unit: '', // Добавить
  din_t_heat_ed_ad: '', // Добавить
  din_faz_sdvig_ad: 0, // Добавить
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
  description: '',
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
  sensor: '',
  control_type: '',
  type: '',
  purpose: '',
  operation_principle: '',
  producer: '',
  manufacturing_technology: '',
};

interface AddDeviceProps {}

const AddDevice: React.FC<AddDeviceProps> = () => {
  const [createDevice] = mainApi.useCreateDeviceMutation();

  const sensors = useAppSelector((state) => state.mainSlice.sensors);
  const deviceTypes = useAppSelector((state) => state.deviceTypeSlice.types);
  const operationPrinciples = useAppSelector((state) => state.operationPrincipleSlice.principles);
  const manufacturingsTechnologys = useAppSelector(
    (state) => state.manufacturingTechnologySlice.manufacturingTechnologys,
  );
  const producers = useAppSelector((state) => state.producerSlice.producers);
  const purposes = useAppSelector((state) => state.purposeSlice.purposes);
  const controlTypes = useAppSelector((state) => state.controlTypeSlice.controlTypes);

  const [device, setDevice] = useState(initialDeviceState);
  const [isError, setIsError] = useState(false);

  const handleAddSensor = () => {
    if (device.name.length === 0) {
      setIsError(true);
      return;
    }

    setIsError(false);
    createDevice(device);
    setDevice(initialDeviceState);
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
              defaultValue={device.name}
              onChange={(name) => setDevice((prev) => ({ ...prev, name }))}
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
            <Typography fontSize={theme.fontSizes.lg} fontWeight={500}>
              Основные параметры
            </Typography>

            <Spacer height={20} />

            <Dropdown
              options={deviceTypes}
              label="Тип датчика"
              labelColor={theme.colors.black}
              onChange={(event) =>
                setDevice((prev: any) => ({ ...prev, type: event.target.value }))
              }
            />
            <Spacer height={10} />
            <Dropdown
              options={sensors}
              label="Датчик"
              labelColor={theme.colors.black}
              onChange={(event) =>
                setDevice((prev: any) => ({ ...prev, sensor: event.target.value }))
              }
            />
            <Spacer height={10} />
            <Dropdown
              options={manufacturingsTechnologys}
              label="Технология изготовления"
              labelColor={theme.colors.black}
              onChange={(event) =>
                setDevice((prev: any) => ({
                  ...prev,
                  manufacturing_technology: event.target.value,
                }))
              }
            />
            <Spacer height={10} />
            <Dropdown
              options={operationPrinciples}
              label="Принцип действия"
              labelColor={theme.colors.black}
              onChange={(event) =>
                setDevice((prev: any) => ({ ...prev, operation_principle: event.target.value }))
              }
            />

            <Spacer height={20} />

            <Typography fontSize={theme.fontSizes.lg} fontWeight={500}>
              Диапозон измерений
            </Typography>

            <Spacer height={10} />

            <InputField
              defaultValue={String(device.measure_min)}
              label="Нижняя граница измерений"
              onChange={(value) => setDevice((prev) => ({ ...prev, measure_min: Number(value) }))}
              placeholder="Нижняя граница измерений"
              type="number"
            />

            <Spacer height={10} />

            <InputField
              defaultValue={String(device.measure_max)}
              label="Верхняя граница измерений"
              onChange={(value) => setDevice((prev) => ({ ...prev, measure_max: Number(value) }))}
              placeholder="Верхняя граница измерений"
              type="number"
            />

            <Spacer height={10} />

            <InputField
              defaultValue={device.unit_of_measuring}
              label="Единица измерения величины"
              onChange={(value) => setDevice((prev) => ({ ...prev, unit_of_measuring: value }))}
              placeholder="Единица измерения величины"
            />

            <Spacer height={20} />

            <Typography fontSize={theme.fontSizes.lg} fontWeight={500}>
              Габаритные размеры и вес
            </Typography>

            <Spacer height={10} />

            <InputField
              defaultValue={String(device.length)}
              label="Длина"
              onChange={(value) => setDevice((prev) => ({ ...prev, length: Number(value) }))}
              placeholder="Длина"
              type="number"
            />

            <Spacer height={10} />

            <InputField
              defaultValue={String(device.width)}
              label="Ширина"
              onChange={(value) => setDevice((prev) => ({ ...prev, length: Number(value) }))}
              placeholder="Ширина"
              type="number"
            />

            <Spacer height={10} />

            <InputField
              defaultValue={String(device.height)}
              label="Высота"
              onChange={(value) => setDevice((prev) => ({ ...prev, height: Number(value) }))}
              placeholder="Высота"
              type="number"
            />

            <Spacer height={10} />

            <InputField
              defaultValue={String(device.diameter)}
              label="Диаметр"
              onChange={(value) => setDevice((prev) => ({ ...prev, diameter: Number(value) }))}
              placeholder="Диаметр"
              type="number"
            />

            <Spacer height={10} />

            <InputField
              defaultValue={device.unit_of_length}
              label="Единица измерения длины"
              onChange={(value) => setDevice((prev) => ({ ...prev, unit_of_length: value }))}
              placeholder="Единица измерения длины"
            />

            <Spacer height={10} />

            <InputField
              defaultValue={String(device.weight)}
              label="Вес"
              onChange={(value) => setDevice((prev) => ({ ...prev, weight: Number(value) }))}
              placeholder="Вес"
              type="number"
            />

            <Spacer height={10} />

            <InputField
              defaultValue={device.unit_of_weight}
              label="Единица измерения веса"
              onChange={(value) => setDevice((prev) => ({ ...prev, unit_of_weight: value }))}
              placeholder="Единица измерения веса"
            />

            <Spacer height={10} />
            <Dropdown
              options={producers}
              label="Производитель"
              labelColor={theme.colors.black}
              onChange={(event) => setDevice((prev) => ({ ...prev, producer: event.target.value }))}
            />

            <Spacer height={10} />
            <Dropdown
              options={purposes}
              label="Назначение"
              labelColor={theme.colors.black}
              onChange={(event) => setDevice((prev) => ({ ...prev, purpose: event.target.value }))}
            />

            <Spacer height={10} />
            <Dropdown
              options={controlTypes}
              label="Тип управления"
              labelColor={theme.colors.black}
              onChange={(event) =>
                setDevice((prev) => ({ ...prev, control_type: event.target.value }))
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
                defaultValue={device.description}
                onChange={(value) => setDevice((prev) => ({ ...prev, description: value }))}
              />
            </STextareaContainer>

            <Spacer height={20} />

            <Typography fontSize={theme.fontSizes.lg} fontWeight={500}>
              Диапозон температур окружающей среды
            </Typography>

            <Spacer height={10} />

            <InputField
              defaultValue={String(device.lower_temperature_threshold)}
              label="Минимальная температура"
              onChange={(value) =>
                setDevice((prev) => ({ ...prev, lower_temperature_threshold: Number(value) }))
              }
              placeholder="Минимальная температура"
              type="number"
            />

            <Spacer height={10} />

            <InputField
              defaultValue={String(device.upper_temperature_threshold)}
              label="Максимальная температура"
              onChange={(value) =>
                setDevice((prev) => ({ ...prev, upper_temperature_threshold: Number(value) }))
              }
              placeholder="Максимальная температура"
              type="number"
            />

            <Spacer height={10} />

            <InputField
              defaultValue={device.temperature_unit}
              label="Единица измерения температуры"
              onChange={(value) => setDevice((prev) => ({ ...prev, temperature_unit: value }))}
              placeholder="Единица измерения температуры"
            />

            <Spacer height={20} />

            <Typography fontSize={theme.fontSizes.lg} fontWeight={500}>
              Дополнительно
            </Typography>

            <Spacer height={10} />

            <InputField
              defaultValue={device.power}
              label="Питание (Вольт)"
              onChange={(value) => setDevice((prev) => ({ ...prev, power: value }))}
              placeholder="Питание (Вольт)"
            />

            <Spacer height={10} />

            <InputField
              defaultValue={device.protection_class}
              label="Класс защиты"
              onChange={(value) => setDevice((prev) => ({ ...prev, protection_class: value }))}
              placeholder="Класс защиты"
            />

            <Spacer height={10} />

            <InputField
              type="number"
              defaultValue={String(device.resource)}
              label="Ресурс работы (Часы)"
              onChange={(value) => setDevice((prev) => ({ ...prev, resource: Number(value) }))}
              placeholder="Ресурс работы (Часы)"
            />

            <Spacer height={10} />

            <InputField
              type="number"
              defaultValue={String(device.measuring_channels)}
              label="Количество измерительных каналов"
              onChange={(value) =>
                setDevice((prev) => ({ ...prev, measuring_channels: Number(value) }))
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
              defaultValue={String(device.dynamic_shift_factor)}
              label="Коэффициент смещения"
              onChange={(value) =>
                setDevice((prev) => ({ ...prev, dynamic_shift_factor: Number(value) }))
              }
              placeholder="Коэффициент смещения"
            />

            <Spacer height={10} />

            <InputField
              type="number"
              defaultValue={String(device.dynamic_static_sensitivity)}
              label="Коэффициент статической чувствительности"
              onChange={(value) =>
                setDevice((prev) => ({ ...prev, dynamic_static_sensitivity: Number(value) }))
              }
              placeholder="Коэффициент статической чувствительности"
            />

            <Spacer height={10} />

            <InputField
              type="number"
              defaultValue={String(device.dynamic_damping_factor)}
              label="Коэффициент демпфирования"
              onChange={(value) =>
                setDevice((prev) => ({ ...prev, dynamic_static_sensitivity: Number(value) }))
              }
              placeholder="Коэффициент демпфирования"
            />

            <Spacer height={10} />

            <InputField
              type="number"
              defaultValue={String(device.dynamic_time_constant)}
              label="Постоянная времени (сек)"
              onChange={(value) =>
                setDevice((prev) => ({ ...prev, dynamic_time_constant: Number(value) }))
              }
              placeholder="Постоянная времени (сек)"
            />

            <Spacer height={10} />

            <InputField
              type="number"
              defaultValue={String(device.dynamic_warm_up_time)}
              label="Время разогрева"
              onChange={(value) =>
                setDevice((prev) => ({ ...prev, dynamic_warm_up_time: Number(value) }))
              }
              placeholder="Время разогрева"
            />

            <Spacer height={10} />

            <InputField
              type="number"
              defaultValue={String(device.dynamic_cutoff_frequency_min)}
              label="Минимальная частота среза (Герц)"
              onChange={(value) =>
                setDevice((prev) => ({ ...prev, dynamic_cutoff_frequency_min: Number(value) }))
              }
              placeholder="Минимальная частота среза (Герц)"
            />

            <Spacer height={10} />

            <InputField
              type="number"
              defaultValue={String(device.dynamic_cutoff_frequency_max)}
              label="Максимальная частота среза (Герц)"
              onChange={(value) =>
                setDevice((prev) => ({ ...prev, dynamic_cutoff_frequency_max: Number(value) }))
              }
              placeholder="Максимальная частота среза (Герц)"
            />

            <Spacer height={10} />

            <InputField
              type="number"
              defaultValue={String(device.dynamic_resonant_frequency)}
              label="Резонансная частота (Герц)"
              onChange={(value) =>
                setDevice((prev) => ({ ...prev, dynamic_resonant_frequency: Number(value) }))
              }
              placeholder="Резонансная частота (Герц)"
            />

            <Spacer height={10} />

            <InputField
              type="number"
              defaultValue={String(device.dynamic_error)}
              label="Динамическая погрешность (%)"
              onChange={(value) => setDevice((prev) => ({ ...prev, dynamic_error: Number(value) }))}
              placeholder="Динамическая погрешность (%)"
            />

            <Spacer height={10} />

            <STextareaContainer>
              <Textarea
                defaultValue={device.dynamic_description}
                onChange={(value) => setDevice((prev) => ({ ...prev, dynamic_description: value }))}
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

export default AddDevice;
