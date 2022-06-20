import React, { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from 'hooks/redux';
import theme from 'theme';

import styled from 'styled-components';

import Typography from 'components/Typography';
import InputField from 'components/InputField';
import Spacer from 'components/Spacer';
import Button from 'components/Button';

import { sensitiveElementApi } from '../services/SensitiveElementApi';
import { SensitiveElementType } from '../types';
import Textarea from 'components/Textarea';
import SensitiveElementList from '../components/SensitiveElementList';

const IS_OBLIGATORY_FIELD_ERROR = 'Обязательное поле';

const SensitiveElement: React.FC = () => {
  const [createSensitiveElement] = sensitiveElementApi.useCreateSensitiveElementMutation();
  const [deleteSensitiveElement] = sensitiveElementApi.useDeleteSensitiveElementMutation();
  const sensitiveElements = useAppSelector(
    (state) => state.sensitiveElementSlice.sensitiveElements,
  );

  const [elementName, setElementName] = useState('');
  const [elementDescription, setElementDescription] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSensitiveElementNameInput = (name: string) => {
    if (name.length > 0) {
      setIsError(false);
    }
    setElementName(name);
  };

  const handleAddSensitiveElement = useCallback(() => {
    if (elementName.length === 0) {
      setIsError(true);
      return;
    }

    createSensitiveElement({
      name: elementName,
      description: elementDescription,
    });

    setElementName('');
    setElementDescription('');
  }, [elementName, elementDescription, setElementName, setElementDescription, setIsError]);

  const handleDeleteSensitiveElement = useCallback(
    (id: number) => {
      deleteSensitiveElement({ id });
    },
    [deleteSensitiveElement],
  );

  const handleChangeSelectedSensitiveElement = useCallback(
    (principle: SensitiveElementType) => {
      setElementName(principle.name);
      setElementDescription(principle.description);
    },
    [setElementName, setElementDescription],
  );

  return (
    <SSensitiveElement>
      <SSensitiveElementHeader>
        <SHeaderContent>
          <Typography fontSize={theme.fontSizes.xxl} fontWeight={500}>
            Чувствительный элемент
          </Typography>
          <Spacer marginRight={40} />
          <SInputContainer>
            <InputField
              defaultValue={elementName}
              onChange={handleSensitiveElementNameInput}
              placeholder="Наименование"
              withBorder
              error={isError ? IS_OBLIGATORY_FIELD_ERROR : null}
            />
          </SInputContainer>
        </SHeaderContent>
        <SHeaderButtonContainer>
          <Button
            onClick={handleAddSensitiveElement}
            color={theme.colors.white}
            backgroundColor={theme.colors.blue}
            hoverBackground={theme.colors.darkBlue}>
            Добавить информацию
          </Button>
        </SHeaderButtonContainer>
      </SSensitiveElementHeader>
      <Spacer height={10} />
      <SSensitiveElementContent>
        <SAddSensitiveElementContent>
          <STextareaContainer>
            <Textarea
              defaultValue={elementDescription}
              onChange={setElementDescription}
              label="Описание"
            />
          </STextareaContainer>
        </SAddSensitiveElementContent>

        <Spacer height={50} />

        <SSensitiveElementListContainer>
          <SensitiveElementList
            data={sensitiveElements}
            deleteSensitiveElementHandle={handleDeleteSensitiveElement}
            changeCurrentSensitiveElementHandle={handleChangeSelectedSensitiveElement}
          />
        </SSensitiveElementListContainer>

        <Spacer height={20} />
      </SSensitiveElementContent>
    </SSensitiveElement>
  );
};

const SSensitiveElement = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;
  min-height: 100%;
`;

const SSensitiveElementHeader = styled.div`
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

const SSensitiveElementContent = styled.div`
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

const SAddSensitiveElementContent = styled.div`
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

const SSensitiveElementListContainer = styled.div`
  width: 70%;
`;

export default SensitiveElement;
