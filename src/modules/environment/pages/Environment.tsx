import React, { useCallback, useState } from 'react';
import { useAppSelector } from 'hooks/redux';
import theme from 'theme';

import styled from 'styled-components';

import Typography from 'components/Typography';
import InputField from 'components/InputField';
import Spacer from 'components/Spacer';
import Button from 'components/Button';

import { environmentApi } from '../services/EnvironmentApi';
import { EnvironmentType } from '../types';
import EnvironmentList from '../components/EnvironmentList';
import Textarea from 'components/Textarea';

const IS_OBLIGATORY_FIELD_ERROR = 'Обязательное поле';

const Environment: React.FC = () => {
  const [createEnvironment] = environmentApi.useCreateEnvironmentMutation();
  const [deleteEnvironment] = environmentApi.useDeleteEnvironmentMutation();
  const environments = useAppSelector((state) => state.environmentSlice.environments);

  const [environmentName, setEnvironmentName] = useState('');
  const [environmentDescription, setEnvironmentDescription] = useState('');
  const [isError, setIsError] = useState(false);

  const handleEnvironmentNameInput = (name: string) => {
    if (name.length > 0) {
      setIsError(false);
    }
    setEnvironmentName(name);
  };

  const handleAddEnvironment = useCallback(() => {
    if (environmentName.length === 0) {
      setIsError(true);
      return;
    }

    createEnvironment({
      name: environmentName,
      description: environmentDescription,
    });

    setEnvironmentName('');
    setEnvironmentDescription('');
  }, [
    environmentName,
    environmentDescription,
    setIsError,
    setEnvironmentName,
    setEnvironmentDescription,
    createEnvironment,
  ]);

  const handleDeleteEnvironment = useCallback(
    (id: number) => {
      deleteEnvironment({ id });
    },
    [deleteEnvironment],
  );

  const handleChangeSelectedEnvironment = useCallback(
    (environment: EnvironmentType) => {
      setEnvironmentName(environment.name);
      setEnvironmentDescription(environment.description);
    },
    [setEnvironmentName, setEnvironmentDescription],
  );

  return (
    <SEnvironment>
      <SEnvironmentHeader>
        <SHeaderContent>
          <Typography fontSize={theme.fontSizes.xxl} fontWeight={500}>
            Среда измерения
          </Typography>
          <Spacer marginRight={40} />
          <SInputContainer>
            <InputField
              defaultValue={environmentName}
              onChange={handleEnvironmentNameInput}
              placeholder="Наименование"
              withBorder
              error={isError ? IS_OBLIGATORY_FIELD_ERROR : null}
            />
          </SInputContainer>
        </SHeaderContent>
        <SHeaderButtonContainer>
          <Button
            onClick={handleAddEnvironment}
            color={theme.colors.white}
            backgroundColor={theme.colors.blue}
            hoverBackground={theme.colors.darkBlue}>
            Добавить информацию
          </Button>
        </SHeaderButtonContainer>
      </SEnvironmentHeader>
      <Spacer height={10} />
      <SEnvironmentContent>
        <SAddEnvironmentContent>
          <STextareaContainer>
            <Textarea
              defaultValue={environmentDescription}
              onChange={setEnvironmentDescription}
              label="Описание"
            />
          </STextareaContainer>
        </SAddEnvironmentContent>

        <Spacer height={50} />

        <SEnvironmentListContainer>
          <EnvironmentList
            data={environments}
            deleteEnvironmentHandle={handleDeleteEnvironment}
            chengeCurrentEnvironmentHandle={handleChangeSelectedEnvironment}
          />
        </SEnvironmentListContainer>

        <Spacer height={20} />
      </SEnvironmentContent>
    </SEnvironment>
  );
};

const SEnvironment = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;
  min-height: 100%;
`;

const SEnvironmentHeader = styled.div`
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

const SEnvironmentContent = styled.div`
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

const SAddEnvironmentContent = styled.div`
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

const SEnvironmentListContainer = styled.div`
  width: 70%;
`;

export default Environment;
