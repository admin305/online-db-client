import React, { useCallback, useState } from 'react';
import { useAppSelector } from 'hooks/redux';
import theme from 'theme';

import styled from 'styled-components';

import Typography from 'components/Typography';
import InputField from 'components/InputField';
import Spacer from 'components/Spacer';
import Button from 'components/Button';
import GetInfoList from 'components/GetInfoList';

import { deviceTypeApi } from '../services/DeviceTypeApi';
import { DeviceType } from '../types';

const IS_OBLIGATORY_FIELD_ERROR = 'Обязательное поле';

const DeviceTypeForm: React.FC = () => {
  const [createDeviceType] = deviceTypeApi.useCreateDeviceTypeMutation();
  const [deleteDeviceType] = deviceTypeApi.useDeleteDeviceTypeMutation();
  const deviceTypes = useAppSelector((state) => state.deviceTypeSlice.types);

  const [deviceTypeName, setDeviceTypeName] = useState('');
  const [isError, setIsError] = useState(false);

  const handleDeviceTypeNameInput = (name: string) => {
    if (name.length > 0) {
      setIsError(false);
    }
    setDeviceTypeName(name);
  };

  const handleAddDeviceType = useCallback(() => {
    if (deviceTypeName.length === 0) {
      setIsError(true);
      return;
    }

    createDeviceType({
      name: deviceTypeName,
    });

    setDeviceTypeName('');
  }, [deviceTypeName, setDeviceTypeName, setIsError, createDeviceType]);

  const handleDeleteDeviceType = useCallback(
    (id: number) => {
      deleteDeviceType({ id });
    },
    [deleteDeviceType],
  );

  const handleItemListClick = useCallback(
    (deviceType: DeviceType) => {
      setDeviceTypeName(deviceType.name);
    },
    [setDeviceTypeName],
  );

  return (
    <SDeviceType>
      <SDeviceTypeHeader>
        <SHeaderContent>
          <Typography fontSize={theme.fontSizes.xxl} fontWeight={500}>
            Тип устройства
          </Typography>
          <Spacer marginRight={40} />
          <SInputContainer>
            <InputField
              defaultValue={deviceTypeName}
              onChange={handleDeviceTypeNameInput}
              placeholder="Наименование"
              withBorder
              error={isError ? IS_OBLIGATORY_FIELD_ERROR : null}
            />
          </SInputContainer>
        </SHeaderContent>
        <SHeaderButtonContainer>
          <Button
            onClick={handleAddDeviceType}
            color={theme.colors.white}
            backgroundColor={theme.colors.blue}
            hoverBackground={theme.colors.darkBlue}>
            Добавить информацию
          </Button>
        </SHeaderButtonContainer>
      </SDeviceTypeHeader>
      <Spacer height={10} />
      <SDeviceTypeContent>
        <Spacer height={50} />

        <SDeviceTypeListContainer>
          <GetInfoList
            data={deviceTypes}
            deleteItemHandler={handleDeleteDeviceType}
            itemClickHandler={handleItemListClick}
          />
        </SDeviceTypeListContainer>

        <Spacer height={20} />
      </SDeviceTypeContent>
    </SDeviceType>
  );
};

const SDeviceType = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;
  min-height: 100%;
`;

const SDeviceTypeHeader = styled.div`
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

const SDeviceTypeContent = styled.div`
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

const SDeviceTypeListContainer = styled.div`
  width: 70%;
`;

export default DeviceTypeForm;
