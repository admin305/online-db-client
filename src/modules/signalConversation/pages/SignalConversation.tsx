import React, { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from 'hooks/redux';
import theme from 'theme';

import styled from 'styled-components';

import Typography from 'components/Typography';
import InputField from 'components/InputField';
import Spacer from 'components/Spacer';
import Button from 'components/Button';

import { signalConversationApi } from '../services/SignalConversationApi';
import { SignalConversationType } from '../types';
import Textarea from 'components/Textarea';
import SignalConversationList from '../components/SignalConversationList';

const IS_OBLIGATORY_FIELD_ERROR = 'Обязательное поле';

const SignalConversation: React.FC = () => {
  const [createSignalConversation] = signalConversationApi.useCreateSignalConversationMutation();
  const [deleteSignalConversation] = signalConversationApi.useDeleteSignalConversationMutation();
  const signalConversations = useAppSelector(
    (state) => state.signalConversationSlice.signalConversations,
  );

  const [signalConversationName, setSignalConversationName] = useState('');
  const [signalConversationDescription, setSignalConversationDescription] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSignalConversationNameInput = (name: string) => {
    if (name.length > 0) {
      setIsError(false);
    }
    setSignalConversationName(name);
  };

  const handleAddSignalConversation = useCallback(() => {
    if (signalConversationName.length === 0) {
      setIsError(true);
      return;
    }

    createSignalConversation({
      name: signalConversationName,
      description: signalConversationDescription,
    });

    setSignalConversationName('');
    setSignalConversationDescription('');
  }, [
    signalConversationName,
    signalConversationDescription,
    setSignalConversationName,
    setSignalConversationDescription,
    setIsError,
  ]);

  const handleDeleteSignalConversation = useCallback(
    (id: number) => {
      deleteSignalConversation({ id });
    },
    [deleteSignalConversation],
  );

  const handleChangeSelectedSignalConversation = useCallback(
    (signalConversation: SignalConversationType) => {
      setSignalConversationName(signalConversation.name);
      setSignalConversationDescription(signalConversation.description);
    },
    [setSignalConversationName, setSignalConversationDescription],
  );

  return (
    <SSignalConversation>
      <SSignalConversationHeader>
        <SHeaderContent>
          <Typography fontSize={theme.fontSizes.xxl} fontWeight={500}>
            Характер преобразования сигнала
          </Typography>
          <Spacer marginRight={40} />
          <SInputContainer>
            <InputField
              defaultValue={signalConversationName}
              onChange={handleSignalConversationNameInput}
              placeholder="Наименование"
              withBorder
              error={isError ? IS_OBLIGATORY_FIELD_ERROR : null}
            />
          </SInputContainer>
        </SHeaderContent>
        <SHeaderButtonContainer>
          <Button
            onClick={handleAddSignalConversation}
            color={theme.colors.white}
            backgroundColor={theme.colors.blue}
            hoverBackground={theme.colors.darkBlue}>
            Добавить информацию
          </Button>
        </SHeaderButtonContainer>
      </SSignalConversationHeader>
      <Spacer height={10} />
      <SSignalConversationContent>
        <SAddSignalConversationContent>
          <STextareaContainer>
            <Textarea
              defaultValue={signalConversationDescription}
              onChange={setSignalConversationDescription}
              label="Описание"
            />
          </STextareaContainer>
        </SAddSignalConversationContent>

        <Spacer height={50} />

        <SSignalConversationListContainer>
          <SignalConversationList
            data={signalConversations}
            deleteSignalConversationHandle={handleDeleteSignalConversation}
            changeCurrentSignalConversationHandle={handleChangeSelectedSignalConversation}
          />
        </SSignalConversationListContainer>

        <Spacer height={20} />
      </SSignalConversationContent>
    </SSignalConversation>
  );
};

const SSignalConversation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;
  min-height: 100%;
`;

const SSignalConversationHeader = styled.div`
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

const SSignalConversationContent = styled.div`
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

const SAddSignalConversationContent = styled.div`
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

const SSignalConversationListContainer = styled.div`
  width: 70%;
`;

export default SignalConversation;
