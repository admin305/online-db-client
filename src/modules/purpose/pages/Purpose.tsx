import React, { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from 'hooks/redux';
import theme from 'theme';

import styled from 'styled-components';

import Typography from 'components/Typography';
import InputField from 'components/InputField';
import Spacer from 'components/Spacer';
import Button from 'components/Button';
import GetInfoList from 'components/GetInfoList';

import { purposeApi } from '../services/PurposeApi';
import { PurposeType } from '../types';

const IS_OBLIGATORY_FIELD_ERROR = 'Обязательное поле';

const Purpose: React.FC = () => {
  const [createPrupose] = purposeApi.useCreatePurposeMutation();
  const [deletePrupose] = purposeApi.useDeletePurposeMutation();
  const environments = useAppSelector((state) => state.purposeSlice.purposes);

  const [purposeName, setPurposeName] = useState('');
  const [isError, setIsError] = useState(false);

  const handlePurposeNameInput = (name: string) => {
    if (name.length > 0) {
      setIsError(false);
    }
    setPurposeName(name);
  };

  const handleAddPurpose = useCallback(() => {
    if (purposeName.length === 0) {
      setIsError(true);
      return;
    }

    createPrupose({
      name: purposeName,
    });

    setPurposeName('');
  }, [purposeName, setPurposeName, setIsError, createPrupose]);

  const handleDeletePurpose = useCallback(
    (id: number) => {
      deletePrupose({ id });
    },
    [deletePrupose],
  );

  const handleItemListClick = useCallback(
    (purpose: PurposeType) => {
      setPurposeName(purpose.name);
    },
    [setPurposeName],
  );

  return (
    <SPurpose>
      <SPurposeHeader>
        <SHeaderContent>
          <Typography fontSize={theme.fontSizes.xxl} fontWeight={500}>
            Назначение
          </Typography>
          <Spacer marginRight={40} />
          <SInputContainer>
            <InputField
              defaultValue={purposeName}
              onChange={handlePurposeNameInput}
              placeholder="Наименование"
              withBorder
              error={isError ? IS_OBLIGATORY_FIELD_ERROR : null}
            />
          </SInputContainer>
        </SHeaderContent>
        <SHeaderButtonContainer>
          <Button
            onClick={handleAddPurpose}
            color={theme.colors.white}
            backgroundColor={theme.colors.blue}
            hoverBackground={theme.colors.darkBlue}>
            Добавить информацию
          </Button>
        </SHeaderButtonContainer>
      </SPurposeHeader>
      <Spacer height={10} />
      <SPurposeContent>
        <Spacer height={50} />

        <SPurposeListContainer>
          <GetInfoList
            data={environments}
            deleteItemHandler={handleDeletePurpose}
            itemClickHandler={handleItemListClick}
          />
        </SPurposeListContainer>

        <Spacer height={20} />
      </SPurposeContent>
    </SPurpose>
  );
};

const SPurpose = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;
  min-height: 100%;
`;

const SPurposeHeader = styled.div`
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

const SPurposeContent = styled.div`
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

const SPurposeListContainer = styled.div`
  width: 70%;
`;

export default Purpose;
