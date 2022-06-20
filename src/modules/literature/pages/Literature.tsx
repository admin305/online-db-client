import React, { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from 'hooks/redux';
import theme from 'theme';

import styled from 'styled-components';

import Typography from 'components/Typography';
import InputField from 'components/InputField';
import Spacer from 'components/Spacer';
import Button from 'components/Button';

import LiteratureList from '../components/LiteratureList';
import { literatureApi } from '../services/LiteratureApi';
import { LiteratureType } from '../types';
import GetInfoList from 'components/GetInfoList';

const IS_OBLIGATORY_FIELD_ERROR = 'Обязательное поле';

const Literature: React.FC = () => {
  const [createLiterature] = literatureApi.useCreateLiteratureMutation();
  const [deleteLiterature] = literatureApi.useDeleteLiteratureMutation();
  const literatures = useAppSelector((state) => state.literatureSlice.literatures);

  const [literatureName, setLiteratureName] = useState('');
  const [literatureAuthor, setLiteratureAuthor] = useState('');
  const [literatureDate, setLiteratureDate] = useState('');
  const [literatureWebsite, setLiteratureWebsite] = useState('');
  const [literaturePublisher, setLiteraturePublisher] = useState('');
  const [isError, setIsError] = useState(false);

  const handleLiteratureNameInput = (name: string) => {
    if (name.length > 0) {
      setIsError(false);
    }
    setLiteratureName(name);
  };

  const handleAddLiterature = useCallback(() => {
    if (literatureName.length === 0) {
      setIsError(true);
      return;
    }

    createLiterature({
      name: literatureName,
      author: literatureAuthor,
      year_of_publish: Number(literatureDate),
      literature_publisher: literaturePublisher,
      literature_website: literatureWebsite,
    });
  }, [
    literatureName,
    literatureAuthor,
    literatureDate,
    literaturePublisher,
    literatureWebsite,
    createLiterature,
    setIsError,
  ]);

  const handleDeleteLiterature = useCallback(
    (id: number) => {
      deleteLiterature({ id });
    },
    [deleteLiterature],
  );

  const handleChangeSelectedLiterature = useCallback(
    (literature: LiteratureType) => {
      setLiteratureName(literature.name);
      setLiteratureAuthor(literature.author);
      setLiteratureDate(String(literature.year_of_publish));
      setLiteratureWebsite(literature.literature_website);
      setLiteraturePublisher(literature.literature_publisher);
    },
    [
      setLiteratureName,
      setLiteratureAuthor,
      setLiteratureDate,
      setLiteratureWebsite,
      setLiteraturePublisher,
    ],
  );

  return (
    <SLiterature>
      <SLiteratureHeader>
        <SHeaderContent>
          <Typography fontSize={theme.fontSizes.xxl} fontWeight={500}>
            Литература
          </Typography>
          <Spacer marginRight={40} />
          <InputField
            defaultValue={literatureName}
            onChange={handleLiteratureNameInput}
            placeholder="Наименование"
            withBorder
            error={isError ? IS_OBLIGATORY_FIELD_ERROR : null}
          />
        </SHeaderContent>
        <SHeaderButtonContainer>
          <Button
            onClick={handleAddLiterature}
            color={theme.colors.white}
            backgroundColor={theme.colors.blue}
            hoverBackground={theme.colors.darkBlue}>
            Добавить информацию
          </Button>
        </SHeaderButtonContainer>
      </SLiteratureHeader>
      <Spacer height={10} />
      <SLiteratureContent>
        <SAddLiteratureContent>
          <SInputsContainer>
            <InputField
              defaultValue={literatureAuthor}
              onChange={setLiteratureAuthor}
              label="Автор"
              placeholder="Автор"
            />
            <Spacer marginRight={20} />
            <InputField
              defaultValue={literatureDate}
              onChange={setLiteratureDate}
              placeholder="Год Выпуска"
              label="Год Выпуска"
            />
          </SInputsContainer>
          <Spacer height={40} />
          <SInputsContainer>
            <InputField
              defaultValue={literatureWebsite}
              onChange={setLiteratureWebsite}
              placeholder="Веб сайт"
              label="Веб сайт"
            />
            <Spacer marginRight={20} />
            <InputField
              defaultValue={literaturePublisher}
              onChange={setLiteraturePublisher}
              placeholder="Издатель"
              label="Издатель"
            />
          </SInputsContainer>
        </SAddLiteratureContent>

        <Spacer height={50} />

        <SLiteratureListContainer>
          <Typography fontSize={theme.fontSizes.lg} fontWeight={500}>
            Доступная литература:
          </Typography>

          <Spacer height={20} />
          <GetInfoList
            data={literatures}
            deleteItemHandler={handleDeleteLiterature}
            itemClickHandler={handleChangeSelectedLiterature}
          />
        </SLiteratureListContainer>

        <Spacer height={20} />
      </SLiteratureContent>
    </SLiterature>
  );
};

const SLiterature = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;
  min-height: 100%;
`;

const SLiteratureHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 70%;
  height: 10%;
`;

const SHeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 60%;
`;

const SHeaderButtonContainer = styled.div`
  width: 20%;
  height: 45px;
`;

const SLiteratureContent = styled.div`
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

const SAddLiteratureContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;

  width: 70%;
  height: 40%;
`;

const SInputsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
`;

const SLiteratureListContainer = styled.div`
  width: 70%;
`;

export default Literature;
