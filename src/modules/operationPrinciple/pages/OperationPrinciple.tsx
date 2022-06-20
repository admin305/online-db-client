import React, { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from 'hooks/redux';
import theme from 'theme';

import styled from 'styled-components';

import Typography from 'components/Typography';
import InputField from 'components/InputField';
import Spacer from 'components/Spacer';
import Button from 'components/Button';

import { operationPrincipleApi } from '../services/OperationPrincipleApi';
import { OperationPrincipleType } from '../types';
import Textarea from 'components/Textarea';
import PrincipleList from '../components/PrincipleList';

const IS_OBLIGATORY_FIELD_ERROR = 'Обязательное поле';

const OperationPrinciple: React.FC = () => {
  const [createOperationPrinciple] = operationPrincipleApi.useCreateOperationPrincipleMutation();
  const [deleteOperationPrinciple] = operationPrincipleApi.useDeleteOperationPrincipleMutation();
  const operationPrinciples = useAppSelector((state) => state.operationPrincipleSlice.principles);

  const [principleName, setPrincipleName] = useState('');
  const [principleDescription, setPrincipleDescription] = useState('');
  const [isError, setIsError] = useState(false);

  const handleOperationPrincipleNameInput = (name: string) => {
    if (name.length > 0) {
      setIsError(false);
    }
    setPrincipleName(name);
  };

  const handleAddOperationPrinciple = useCallback(() => {
    if (principleName.length === 0) {
      setIsError(true);
      return;
    }

    createOperationPrinciple({
      name: principleName,
      description: principleDescription,
    });

    setPrincipleName('');
    setPrincipleDescription('');
  }, [principleName, principleDescription, setIsError]);

  const handleDeleteOperationPrinciple = useCallback(
    (id: number) => {
      deleteOperationPrinciple({ id });
    },
    [deleteOperationPrinciple],
  );

  const handleChangeSelectedOperationPrinciple = useCallback(
    (principle: OperationPrincipleType) => {
      setPrincipleName(principle.name);
      setPrincipleDescription(principle.description);
    },
    [setPrincipleName, setPrincipleDescription],
  );

  return (
    <SOperationPrinciple>
      <SOperationPrincipleHeader>
        <SHeaderContent>
          <Typography fontSize={theme.fontSizes.xxl} fontWeight={500}>
            Принцип действия
          </Typography>
          <Spacer marginRight={40} />
          <SInputContainer>
            <InputField
              defaultValue={principleName}
              onChange={handleOperationPrincipleNameInput}
              placeholder="Наименование"
              withBorder
              error={isError ? IS_OBLIGATORY_FIELD_ERROR : null}
            />
          </SInputContainer>
        </SHeaderContent>
        <SHeaderButtonContainer>
          <Button
            onClick={handleAddOperationPrinciple}
            color={theme.colors.white}
            backgroundColor={theme.colors.blue}
            hoverBackground={theme.colors.darkBlue}>
            Добавить информацию
          </Button>
        </SHeaderButtonContainer>
      </SOperationPrincipleHeader>
      <Spacer height={10} />
      <SOperationPrincipleContent>
        <SAddOperationPrincipleContent>
          <STextareaContainer>
            <Textarea
              defaultValue={principleDescription}
              onChange={setPrincipleDescription}
              label="Описание"
            />
          </STextareaContainer>
        </SAddOperationPrincipleContent>

        <Spacer height={50} />

        <SOperationPrincipleListContainer>
          <PrincipleList
            data={operationPrinciples}
            deletePrincipleHandle={handleDeleteOperationPrinciple}
            changeCurrentPrincipleHandle={handleChangeSelectedOperationPrinciple}
          />
        </SOperationPrincipleListContainer>

        <Spacer height={20} />
      </SOperationPrincipleContent>
    </SOperationPrinciple>
  );
};

const SOperationPrinciple = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;
  min-height: 100%;
`;

const SOperationPrincipleHeader = styled.div`
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

const SOperationPrincipleContent = styled.div`
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

const SAddOperationPrincipleContent = styled.div`
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

const SOperationPrincipleListContainer = styled.div`
  width: 70%;
`;

export default OperationPrinciple;
