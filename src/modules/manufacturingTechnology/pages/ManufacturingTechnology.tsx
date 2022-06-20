import React, { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from 'hooks/redux';
import theme from 'theme';

import styled from 'styled-components';

import Typography from 'components/Typography';
import InputField from 'components/InputField';
import Spacer from 'components/Spacer';
import Button from 'components/Button';

import { manufacturingTechnologyApi } from '../services/ManufacturingTechnologyApi';
import { ManufacturingTechnologyType } from '../types';
import TechnologyList from '../components/TechnologyList';
import Textarea from 'components/Textarea';

const IS_OBLIGATORY_FIELD_ERROR = 'Обязательное поле';

const ManufacturingTechnology: React.FC = () => {
  const [createTechnology] = manufacturingTechnologyApi.useCreateManufacturingTechnologyMutation();
  const [deleteTechnology] = manufacturingTechnologyApi.useDeleteManufacturingTechnologyMutation();
  const technologys = useAppSelector(
    (state) => state.manufacturingTechnologySlice.manufacturingTechnologys,
  );

  const [technologyName, setTechnologyName] = useState('');
  const [technologyDescription, setTechnologyDescription] = useState('');
  const [isError, setIsError] = useState(false);

  const handleTechnologyNameInput = (name: string) => {
    if (name.length > 0) {
      setIsError(false);
    }
    setTechnologyName(name);
  };

  const handleAddTechnology = useCallback(() => {
    if (technologyName.length === 0) {
      setIsError(true);
      return;
    }

    createTechnology({
      name: technologyName,
      description: technologyDescription,
    });

    setTechnologyName('');
    setTechnologyDescription('');
  }, [technologyName, technologyDescription, setIsError, createTechnology]);

  const handleDeleteTechnology = useCallback(
    (id: number) => {
      deleteTechnology({ id });
    },
    [deleteTechnology],
  );

  const handleChangeSelectedTechnology = useCallback(
    (technology: ManufacturingTechnologyType) => {
      setTechnologyName(technology.name);
      setTechnologyDescription(technology.description);
    },
    [setTechnologyName, setTechnologyDescription],
  );

  return (
    <SManufacturingTechnology>
      <SManufacturingTechnologyHeader>
        <SHeaderContent>
          <Typography fontSize={theme.fontSizes.xxl} fontWeight={500}>
            Технология изготовления
          </Typography>
          <Spacer marginRight={40} />
          <SInputContainer>
            <InputField
              defaultValue={technologyName}
              onChange={handleTechnologyNameInput}
              placeholder="Наименование"
              withBorder
              error={isError ? IS_OBLIGATORY_FIELD_ERROR : null}
            />
          </SInputContainer>
        </SHeaderContent>
        <SHeaderButtonContainer>
          <Button
            onClick={handleAddTechnology}
            color={theme.colors.white}
            backgroundColor={theme.colors.blue}
            hoverBackground={theme.colors.darkBlue}>
            Добавить информацию
          </Button>
        </SHeaderButtonContainer>
      </SManufacturingTechnologyHeader>
      <Spacer height={10} />
      <SManufacturingTechnologyContent>
        <SAddManufacturingTechnologyContent>
          <STextareaContainer>
            <Textarea
              defaultValue={technologyDescription}
              onChange={setTechnologyDescription}
              label="Описание"
            />
          </STextareaContainer>
        </SAddManufacturingTechnologyContent>

        <Spacer height={50} />

        <SManufacturingTechnologyListContainer>
          <TechnologyList
            data={technologys}
            deleteTechnologyHandle={handleDeleteTechnology}
            changeCurrentTechnologyHandle={handleChangeSelectedTechnology}
          />
        </SManufacturingTechnologyListContainer>

        <Spacer height={20} />
      </SManufacturingTechnologyContent>
    </SManufacturingTechnology>
  );
};

const SManufacturingTechnology = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;
  min-height: 100%;
`;

const SManufacturingTechnologyHeader = styled.div`
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
  width: 40%;
`;

const SHeaderButtonContainer = styled.div`
  width: 20%;
  height: 45px;
`;

const SManufacturingTechnologyContent = styled.div`
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

const SAddManufacturingTechnologyContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;

  width: 70%;
  height: 40%;
`;

const STextareaContainer = styled.div`
  width: 100%;
  height: 300px;
`;

const SManufacturingTechnologyListContainer = styled.div`
  width: 70%;
`;

export default ManufacturingTechnology;
