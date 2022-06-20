import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import theme from 'theme';

import { getDevice } from 'modules/main/services/MainSlice';

import styled from 'styled-components';

import Typography from 'components/Typography';
import Spacer from 'components/Spacer';
import InputField from 'components/InputField';
import Button from 'components/Button';
import Dropdown from 'components/Dropdown';
import Textarea from 'components/Textarea';
import { useAppSelector } from 'hooks/redux';
import { IS_OBLIGATORY_FIELD_ERROR } from 'types';

interface DeviceProps {}

interface LocationState {
  id: number;
}

const Device: React.FC<DeviceProps> = () => {
  const location = useLocation();
  const { id } = location.state as LocationState;
  const devices = useAppSelector((state) => state.mainSlice.devices);
  const device = getDevice(devices, id);

  const [deviceValue, setDeviceValue] = useState(device[0]);
  const [isError, setIsError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  return (
    <SDevice>
      <SDeviceHeader>
        <SHeaderContent>
          <Typography fontSize={theme.fontSizes.xxl} fontWeight={500}>
            Прибор
          </Typography>
          <Spacer marginRight={40} />
          <SInputContainer>
            <InputField
              defaultValue={deviceValue.name}
              onChange={(name) => setDeviceValue((prev) => ({ ...prev, name }))}
              placeholder="Наименование"
              withBorder
              error={isError ? IS_OBLIGATORY_FIELD_ERROR : null}
              disabled={isDisabled}
            />
          </SInputContainer>
        </SHeaderContent>
        {/* <SHeaderButtonContainer>
          <Button
            onClick={handleAddDevice}
            color={theme.colors.white}
            backgroundColor={theme.colors.blue}
            hoverBackground={theme.colors.darkBlue}>
            Добавить информацию
          </Button>
        </SHeaderButtonContainer> */}
      </SDeviceHeader>
      <Spacer height={10} />
      <SDeviceContent>
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
              errorRateValue={String(Device.measurement_error)}
              onChange={setDevice}
            /> */}

            <Spacer height={20} />

            <Typography fontSize={theme.fontSizes.lg} fontWeight={500}>
              Диапозон измерений
            </Typography>

            <Spacer height={10} />

            <InputField
              defaultValue={String(deviceValue.measure_min)}
              label="Нижняя граница измерений"
              onChange={(value) =>
                setDeviceValue((prev) => ({ ...prev, measure_min: Number(value) }))
              }
              disabled={isDisabled}
              placeholder="Нижняя граница измерений"
              type="number"
            />

            <Spacer height={10} />

            <InputField
              defaultValue={String(deviceValue.measure_max)}
              label="Верхняя граница измерений"
              onChange={(value) =>
                setDeviceValue((prev) => ({ ...prev, measure_max: Number(value) }))
              }
              placeholder="Верхняя граница измерений"
              type="number"
              disabled={isDisabled}
            />

            <Spacer height={10} />

            <InputField
              defaultValue={deviceValue.unit_of_measuring}
              label="Единица измерения величины"
              onChange={(value) =>
                setDeviceValue((prev) => ({ ...prev, unit_of_measuring: value }))
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
              defaultValue={String(deviceValue.length)}
              label="Длина"
              onChange={(value) => setDeviceValue((prev) => ({ ...prev, length: Number(value) }))}
              placeholder="Длина"
              type="number"
              disabled={isDisabled}
            />

            <Spacer height={10} />

            <InputField
              defaultValue={String(deviceValue.width)}
              label="Ширина"
              onChange={(value) => setDeviceValue((prev) => ({ ...prev, length: Number(value) }))}
              placeholder="Ширина"
              type="number"
              disabled={isDisabled}
            />

            <Spacer height={10} />

            <InputField
              defaultValue={String(deviceValue.height)}
              label="Высота"
              onChange={(value) => setDeviceValue((prev) => ({ ...prev, height: Number(value) }))}
              placeholder="Высота"
              type="number"
              disabled={isDisabled}
            />

            <Spacer height={10} />

            <InputField
              defaultValue={String(deviceValue.diameter)}
              label="Диаметр"
              onChange={(value) => setDeviceValue((prev) => ({ ...prev, diameter: Number(value) }))}
              placeholder="Диаметр"
              type="number"
              disabled={isDisabled}
            />

            <Spacer height={10} />

            <InputField
              defaultValue={deviceValue.unit_of_length}
              label="Единица измерения длины"
              onChange={(value) => setDeviceValue((prev) => ({ ...prev, unit_of_length: value }))}
              placeholder="Единица измерения длины"
              disabled={isDisabled}
            />

            <Spacer height={10} />

            <InputField
              defaultValue={String(deviceValue.weight)}
              label="Вес"
              onChange={(value) => setDeviceValue((prev) => ({ ...prev, weight: Number(value) }))}
              placeholder="Вес"
              type="number"
              disabled={isDisabled}
            />

            <Spacer height={10} />

            <InputField
              defaultValue={deviceValue.unit_of_weight}
              label="Единица измерения веса"
              onChange={(value) => setDeviceValue((prev) => ({ ...prev, unit_of_weight: value }))}
              placeholder="Единица измерения веса"
              disabled={isDisabled}
            />

            {/* <Spacer height={10} />
            <Dropdown
              options={producers}
              label="Производитель"
              labelColor={theme.colors.black}
              onChange={(event) =>
                setDeviceValue((prev) => ({ ...prev, producer: event.target.value }))
              }
            />

            <Spacer height={10} />
            <Dropdown
              options={literatures}
              label="Литература"
              labelColor={theme.colors.black}
              onChange={(event) =>
                setDeviceValue((prev) => ({ ...prev, literature: event.target.value }))
              }
            />

            <Spacer height={10} />
            <Dropdown
              options={environments}
              label="Среда измерения"
              labelColor={theme.colors.black}
              onChange={(event) =>
                setDeviceValue((prev) => ({ ...prev, environment: event.target.value }))
              }
            /> */}

            {/* <Spacer height={10} />
            <Dropdown
              options={applicationSpheres}
              label="Область применения"
              labelColor={theme.colors.black}
              onChange={(event) =>
                setDeviceValue((prev) => ({ ...prev, application_sphere: event.target.value }))
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
                defaultValue={deviceValue.description}
                onChange={(value) => setDeviceValue((prev) => ({ ...prev, description: value }))}
              />
            </STextareaContainer>

            <Spacer height={20} />

            <Typography fontSize={theme.fontSizes.lg} fontWeight={500}>
              Диапозон температур окружающей среды
            </Typography>

            <Spacer height={10} />

            <InputField
              defaultValue={String(deviceValue.lower_temperature_threshold)}
              label="Минимальная температура"
              onChange={(value) =>
                setDeviceValue((prev) => ({ ...prev, lower_temperature_threshold: Number(value) }))
              }
              placeholder="Минимальная температура"
              type="number"
              disabled={isDisabled}
            />

            <Spacer height={10} />

            <InputField
              defaultValue={String(deviceValue.upper_temperature_threshold)}
              label="Максимальная температура"
              onChange={(value) =>
                setDeviceValue((prev) => ({ ...prev, upper_temperature_threshold: Number(value) }))
              }
              placeholder="Максимальная температура"
              type="number"
              disabled={isDisabled}
            />

            <Spacer height={10} />

            <InputField
              defaultValue={deviceValue.temperature_unit}
              label="Единица измерения температуры"
              onChange={(value) => setDeviceValue((prev) => ({ ...prev, temperature_unit: value }))}
              placeholder="Единица измерения температуры"
              disabled={isDisabled}
            />

            <Spacer height={20} />

            <Typography fontSize={theme.fontSizes.lg} fontWeight={500}>
              Дополнительно
            </Typography>

            <Spacer height={10} />

            <InputField
              defaultValue={deviceValue.power}
              label="Питание (Вольт)"
              onChange={(value) => setDeviceValue((prev) => ({ ...prev, power: value }))}
              placeholder="Питание (Вольт)"
              disabled={isDisabled}
            />

            <Spacer height={10} />

            <InputField
              defaultValue={deviceValue.protection_class}
              label="Класс защиты"
              onChange={(value) => setDeviceValue((prev) => ({ ...prev, protection_class: value }))}
              placeholder="Класс защиты"
              disabled={isDisabled}
            />

            <Spacer height={10} />

            <InputField
              type="number"
              defaultValue={String(deviceValue.resource)}
              label="Ресурс работы (Часы)"
              onChange={(value) => setDeviceValue((prev) => ({ ...prev, resource: Number(value) }))}
              placeholder="Ресурс работы (Часы)"
              disabled={isDisabled}
            />

            <Spacer height={10} />

            <InputField
              type="number"
              defaultValue={String(deviceValue.measuring_channels)}
              label="Количество измерительных каналов"
              onChange={(value) =>
                setDeviceValue((prev) => ({ ...prev, measuring_channels: Number(value) }))
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
              defaultValue={String(deviceValue.dynamic_shift_factor)}
              label="Коэффициент смещения"
              onChange={(value) =>
                setDeviceValue((prev) => ({ ...prev, dynamic_shift_factor: Number(value) }))
              }
              placeholder="Коэффициент смещения"
              disabled={isDisabled}
            />

            <Spacer height={10} />

            <InputField
              type="number"
              defaultValue={String(deviceValue.dynamic_static_sensitivity)}
              label="Коэффициент статической чувствительности"
              onChange={(value) =>
                setDeviceValue((prev) => ({ ...prev, dynamic_static_sensitivity: Number(value) }))
              }
              placeholder="Коэффициент статической чувствительности"
              disabled={isDisabled}
            />

            <Spacer height={10} />

            <InputField
              type="number"
              defaultValue={String(deviceValue.dynamic_damping_factor)}
              label="Коэффициент демпфирования"
              onChange={(value) =>
                setDeviceValue((prev) => ({ ...prev, dynamic_static_sensitivity: Number(value) }))
              }
              placeholder="Коэффициент демпфирования"
              disabled={isDisabled}
            />

            <Spacer height={10} />

            <InputField
              type="number"
              defaultValue={String(deviceValue.dynamic_time_constant)}
              label="Постоянная времени (сек)"
              onChange={(value) =>
                setDeviceValue((prev) => ({ ...prev, dynamic_time_constant: Number(value) }))
              }
              placeholder="Постоянная времени (сек)"
              disabled={isDisabled}
            />

            <Spacer height={10} />

            <InputField
              type="number"
              defaultValue={String(deviceValue.dynamic_warm_up_time)}
              label="Время разогрева"
              onChange={(value) =>
                setDeviceValue((prev) => ({ ...prev, dynamic_warm_up_time: Number(value) }))
              }
              placeholder="Время разогрева"
              disabled={isDisabled}
            />

            <Spacer height={10} />

            <InputField
              type="number"
              defaultValue={String(deviceValue.dynamic_cutoff_frequency_min)}
              label="Минимальная частота среза (Герц)"
              onChange={(value) =>
                setDeviceValue((prev) => ({ ...prev, dynamic_cutoff_frequency_min: Number(value) }))
              }
              placeholder="Минимальная частота среза (Герц)"
              disabled={isDisabled}
            />

            <Spacer height={10} />

            <InputField
              type="number"
              defaultValue={String(deviceValue.dynamic_cutoff_frequency_max)}
              label="Максимальная частота среза (Герц)"
              onChange={(value) =>
                setDeviceValue((prev) => ({ ...prev, dynamic_cutoff_frequency_max: Number(value) }))
              }
              placeholder="Максимальная частота среза (Герц)"
              disabled={isDisabled}
            />

            <Spacer height={10} />

            <InputField
              type="number"
              defaultValue={String(deviceValue.dynamic_resonant_frequency)}
              label="Резонансная частота (Герц)"
              onChange={(value) =>
                setDeviceValue((prev) => ({ ...prev, dynamic_resonant_frequency: Number(value) }))
              }
              placeholder="Резонансная частота (Герц)"
              disabled={isDisabled}
            />

            <Spacer height={10} />

            <InputField
              type="number"
              defaultValue={String(deviceValue.dynamic_error)}
              label="Динамическая погрешность (%)"
              onChange={(value) =>
                setDeviceValue((prev) => ({ ...prev, dynamic_error: Number(value) }))
              }
              placeholder="Динамическая погрешность (%)"
              disabled={isDisabled}
            />

            <Spacer height={10} />

            <STextareaContainer>
              <Textarea
                defaultValue={deviceValue.dynamic_description}
                onChange={(value) =>
                  setDeviceValue((prev) => ({ ...prev, dynamic_description: value }))
                }
                label="Дополнительные сведения"
              />
            </STextareaContainer>
          </SParamsRightSide>
        </SParamContainer>

        <Spacer height={60} />
      </SDeviceContent>
    </SDevice>
  );
};

const SDevice = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;
  min-height: 100%;
`;

const SDeviceHeader = styled.div`
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

const SDeviceContent = styled.div`
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

const SDeviceListContainer = styled.div`
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

export default Device;
