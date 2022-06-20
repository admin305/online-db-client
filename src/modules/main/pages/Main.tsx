import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import theme from 'theme';

import styled from 'styled-components';

import Button from 'components/Button';
import Table from 'components/Table';
import Typography from 'components/Typography';
import PlusIcon from 'components/icons/PlusIcon';
import Spacer from 'components/Spacer';
import { applicationSphereApi } from 'modules/applicationSphere/servises/ApplicationSphereApi';
import { controlTypeApi } from 'modules/controlType/services/ControlTypeApi';
import { environmentApi } from 'modules/environment/services/EnvironmentApi';
import { literatureApi } from 'modules/literature/services/LiteratureApi';
import { manufacturingTechnologyApi } from 'modules/manufacturingTechnology/services/ManufacturingTechnologyApi';
import { operationPrincipleApi } from 'modules/operationPrinciple/services/OperationPrincipleApi';
import { outputSignalApi } from 'modules/outputSignal/services/OutputSignalApi';
import { producerApi } from 'modules/producer/servises/ProducerApi';
import { purposeApi } from 'modules/purpose/services/PurposeApi';
import { sensitiveElementApi } from 'modules/sensitiveElement/services/SensitiveElementApi';
import { signalConversationApi } from 'modules/signalConversation/services/SignalConversationApi';
import { deviceTypeApi } from 'modules/deviceType/services/DeviceTypeApi';

import MainSidebarFilters from '../components/MainSidebarFilters';
import { mainApi } from '../services/MainApi';
import { useAppSelector } from 'hooks/redux';
import { Sensor, Device } from '../types';

// Mocked data
enum ColumnTitles {
  name = 'Название',
  product = 'Изделие',
  type = 'Тип устройства',
  measuringRange = 'Диапозон измерений',
  measurementError = 'Погрешность измерения',
  resource = 'Ресурс работы',
  weight = 'Вес',
  action = 'Действие',
}

const ACTION_KEY = 'action';

const Main: React.FC = () => {
  const navigate = useNavigate();
  const [getAllSensors] = mainApi.useGetAllSensorsMutation();
  const [getAllDevices] = mainApi.useGetAllDevicesMutation();
  const [getAllControlTypes] = controlTypeApi.useGetAllControlTypesMutation();
  const [getAllEnvironments] = environmentApi.useGetAllEnvironmentsMutation();
  const [getAllLiteratures] = literatureApi.useGetAllLiteraturesMutation();
  const [getAllApplicationSpheres] = applicationSphereApi.useGetAllApplicationSpheresMutation();
  const [getAllTechnologys] =
    manufacturingTechnologyApi.useGetAllManufacturingTechnologysMutation();
  const [getAllOperationPrinciples] = operationPrincipleApi.useGetAllOperationPrinciplesMutation();
  const [getAllOutputSignals] = outputSignalApi.useGetAllOutputSignalsMutation();
  const [getAllProducers] = producerApi.useGetAllProducersMutation();
  const [getAllPruposes] = purposeApi.useGetAllPurposeMutation();
  const [getAllSensitiveElements] = sensitiveElementApi.useGetAllSensitiveElementsMutation();
  const [getAllSignalConversations] = signalConversationApi.useGetAllSignalConversationsMutation();
  const [getAllDeviceTypes] = deviceTypeApi.useGetAllDeviceTypesMutation();
  const [removeSensor] = mainApi.useRemoveSensorMutation();
  const [removeDevice] = mainApi.useRemoveDeviceMutation();
  const sensors = useAppSelector((state) => state.mainSlice.sensors);
  const devices = useAppSelector((state) => state.mainSlice.devices);

  const [isSidebarActive, setIsSisebarActive] = useState(false);
  const [isSensorTableActive, setIsSensorTableActive] = useState(true);
  const [filterSensorData, setFilterSensorData] = useState(sensors);
  const [filterDeviceData, setFilterDeviceData] = useState(devices);

  const columns = useCallback((data: Sensor[] | Device[], removeHandler) => {
    if (data[0]) {
      const sensorColumns = data.map((item) => ({
        name: item.name,
        product: 'Датчик',
        type: item.type[0]?.name,
        measuringRange: `${item.measure_min} - ${item.measure_max} ${item.unit_of_measuring}`,
        resource: `${item.resource} ч.`,
        weight: `${item.weight} ${item.unit_of_weight}`,
        action: ColumnTitles.action,
      }));
      const keys = Object.keys(sensorColumns[0]);

      return keys.map((key) => ({
        title: ColumnTitles[key as keyof typeof ColumnTitles],
        key,
        render: (value: string, id: number) => {
          if (key === ACTION_KEY) {
            console.log(id);
            return (
              <SButtonContainer>
                <Button
                  backgroundColor={theme.colors.red}
                  hoverBackground={theme.colors.red}
                  onClick={(event) => {
                    event?.stopPropagation();
                    removeHandler({ id });
                  }}>
                  <Typography fontWeight={600} color={theme.colors.white}>
                    Удалить
                  </Typography>
                </Button>
              </SButtonContainer>
            );
          }

          return value;
        },
      }));
    }

    return [];
  }, []);

  useEffect(() => {
    getAllSensors();
    getAllDevices();
    getAllApplicationSpheres();
    getAllControlTypes();
    getAllEnvironments();
    getAllLiteratures();
    getAllTechnologys();
    getAllOperationPrinciples();
    getAllOutputSignals();
    getAllProducers();
    getAllPruposes();
    getAllSensitiveElements();
    getAllSignalConversations();
    getAllDeviceTypes();
  }, [
    getAllSensors,
    getAllDevices,
    getAllApplicationSpheres,
    getAllControlTypes,
    getAllEnvironments,
    getAllLiteratures,
    getAllTechnologys,
    getAllOperationPrinciples,
    getAllOutputSignals,
    getAllProducers,
    getAllPruposes,
    getAllSensitiveElements,
    getAllSignalConversations,
    getAllDeviceTypes,
  ]);

  return (
    <SMain>
      <SFilterButton>
        <Button
          onClick={() => setIsSisebarActive(true)}
          backgroundColor={theme.colors.blue}
          withHoverBorder
          hoverBackground={theme.colors.darkBlue}>
          <SButtonContent>
            <Typography color={theme.colors.white}>Фильтры</Typography>

            <Spacer marginRight={10} />
            <SCloseIconContainer>
              <PlusIcon fill={theme.colors.white} />
            </SCloseIconContainer>
          </SButtonContent>
        </Button>
      </SFilterButton>

      <STableContainer>
        <Spacer height={50} />
        <STableHeader>
          <SSwitchButton
            isActive={!isSensorTableActive}
            onClick={() => setIsSensorTableActive(true)}>
            <Typography fontWeight={600}>Датчики</Typography>
          </SSwitchButton>
          <Spacer marginRight={20} />
          <SSwitchButton
            isActive={isSensorTableActive}
            onClick={() => setIsSensorTableActive(false)}>
            <Typography fontWeight={600}>Приборы</Typography>
          </SSwitchButton>
        </STableHeader>
        {isSensorTableActive ? (
          <Table
            columns={columns(sensors, removeSensor)}
            data={filterSensorData.map((item) => ({
              id: item.id,
              product: 'Датчик',
              name: item.name,
              type: item.type[0]?.name,
              measuringRange: `${item.measure_min} - ${item.measure_max} ${item.unit_of_measuring}`,
              resource: `${item.resource} ч.`,
              weight: `${item.weight} ${item.unit_of_weight}`,
              action: ColumnTitles.action,
            }))}
            onClick={(item) => {
              navigate('/sensor', { state: { id: item.id } });
            }}
          />
        ) : (
          <Table
            columns={columns(devices, removeDevice)}
            data={filterDeviceData.map((item) => ({
              id: item.id,
              product: 'Прибор',
              name: item.name,
              type: item.type[0]?.name,
              measuringRange: `${item.measure_min} - ${item.measure_max} ${item.unit_of_measuring}`,
              resource: `${item.resource} ч.`,
              weight: `${item.weight} ${item.unit_of_weight}`,
              action: ColumnTitles.action,
            }))}
            onClick={(item) => {
              navigate('/device', { state: { id: item.id } });
            }}
          />
        )}
        <Spacer height={50} />
      </STableContainer>
      <MainSidebarFilters
        sensorData={sensors}
        filterSensorData={filterSensorData}
        setFilterSensorData={setFilterSensorData}
        deviceData={devices}
        filterDeviceData={filterDeviceData}
        setFilterDeviceData={setFilterDeviceData}
        isActive={isSidebarActive}
        setIsActive={setIsSisebarActive}
        isSensorSearchActive={isSensorTableActive}
      />
    </SMain>
  );
};

const SMain = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;

  width: 100%;
  min-height: 100vh;
  background: ${theme.colors.backgroundLightBlueColor};
`;

const SFilterButton = styled.div`
  position: absolute;
  top: 24%;
  left: 10px;
  transform: translate(0%, 0%);

  width: 150px;
  height: 50px;
`;

const STableContainer = styled.div`
  width: 70%;
  height: 100%;
`;

const SCloseIconContainer = styled.div`
  width: 20px;
  height: 20px;
`;

const SButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  color: ${theme.colors.statusBlue};

  &:hover {
    color: ${theme.colors.white};
  }
`;

const STypography = styled.div`
  color: inherit;

  &:hover {
    color: inherit;
  }
`;

const SButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 40px;
  padding: 5px 10px;
`;

const STableHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  width: 100%;
  padding-left: 50px;
`;

const SSwitchButton = styled.button<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 30px;
  width: 100px;
  border: none;
  border-radius: 5px 5px 0 0;
  background: ${theme.colors.white};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  ${(props) => props.isActive && ` box-shadow: inset 0px 0px 5px -3px;`}
`;

export default Main;
