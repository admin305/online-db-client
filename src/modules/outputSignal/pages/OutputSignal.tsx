import React, { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from 'hooks/redux';
import theme from 'theme';

import styled from 'styled-components';

import Typography from 'components/Typography';
import InputField from 'components/InputField';
import Spacer from 'components/Spacer';
import Button from 'components/Button';

import { outputSignalApi } from '../services/OutputSignalApi';
import { OutputSignalType } from '../types';
import Textarea from 'components/Textarea';
import OutputSignalList from '../components/OutputSignalList';

const IS_OBLIGATORY_FIELD_ERROR = 'Обязательное поле';

const OutputSignal: React.FC = () => {
  const [createOutputSignal] = outputSignalApi.useCreateOutputSignalMutation();
  const [deleteOutputSignals] = outputSignalApi.useDeleteOutputSignalMutation();
  const outputSignals = useAppSelector((state) => state.outputSignalSlice.outputSignals);

  const [signalName, setSignalName] = useState('');
  const [signalDescription, setSignalDescription] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSignalNameInput = (name: string) => {
    if (name.length > 0) {
      setIsError(false);
    }
    setSignalName(name);
  };

  const handleAddSignal = useCallback(() => {
    if (signalName.length === 0) {
      setIsError(true);
      return;
    }

    createOutputSignal({
      name: signalName,
      description: signalDescription,
    });

    setSignalName('');
    setSignalDescription('');
  }, [signalName, signalDescription, setIsError]);

  const handleDeleteSignal = useCallback(
    (id: number) => {
      deleteOutputSignals({ id });
    },
    [deleteOutputSignals],
  );

  const handleChangeSelectedSignal = useCallback(
    (Signal: OutputSignalType) => {
      setSignalName(Signal.name);
      setSignalDescription(Signal.description);
    },
    [setSignalName, setSignalDescription],
  );

  return (
    <SSignal>
      <SSignalHeader>
        <SHeaderContent>
          <Typography fontSize={theme.fontSizes.xxl} fontWeight={500}>
            Характер выходного сигнала
          </Typography>
          <Spacer marginRight={40} />
          <SInputContainer>
            <InputField
              defaultValue={signalName}
              onChange={handleSignalNameInput}
              placeholder="Наименование"
              withBorder
              error={isError ? IS_OBLIGATORY_FIELD_ERROR : null}
            />
          </SInputContainer>
        </SHeaderContent>
        <SHeaderButtonContainer>
          <Button
            onClick={handleAddSignal}
            color={theme.colors.white}
            backgroundColor={theme.colors.blue}
            hoverBackground={theme.colors.darkBlue}>
            Добавить информацию
          </Button>
        </SHeaderButtonContainer>
      </SSignalHeader>
      <Spacer height={10} />
      <SSignalContent>
        <SAddSignalContent>
          <STextareaContainer>
            <Textarea
              defaultValue={signalDescription}
              onChange={setSignalDescription}
              label="Описание"
            />
          </STextareaContainer>
        </SAddSignalContent>

        <Spacer height={50} />

        <SSignalListContainer>
          <OutputSignalList
            data={outputSignals}
            deleteOutputSignalHandle={handleDeleteSignal}
            changeCurrentOutputSignalHandle={handleChangeSelectedSignal}
          />
        </SSignalListContainer>

        <Spacer height={20} />
      </SSignalContent>
    </SSignal>
  );
};

const SSignal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;
  min-height: 100%;
`;

const SSignalHeader = styled.div`
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
  width: 35%;
`;

const SHeaderButtonContainer = styled.div`
  width: 20%;
  height: 45px;
`;

const SSignalContent = styled.div`
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

const SAddSignalContent = styled.div`
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

const SSignalListContainer = styled.div`
  width: 70%;
`;

export default OutputSignal;
