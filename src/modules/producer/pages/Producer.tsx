import React, { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from 'hooks/redux';
import theme from 'theme';

import styled from 'styled-components';

import Typography from 'components/Typography';
import InputField from 'components/InputField';
import Spacer from 'components/Spacer';
import Button from 'components/Button';

// import LiteratureList from "../components/LiteratureList";
import { producerApi } from '../servises/ProducerApi';
import { ProducerType } from '../types';
import ProducerList from '../components/ProducerList';
import GetInfoList from 'components/GetInfoList';

const IS_OBLIGATORY_FIELD_ERROR = 'Обязательное поле';

const Producer: React.FC = () => {
  const [createProducer] = producerApi.useCreateProducerMutation();
  const [deleteProducer] = producerApi.useDeleteProducerMutation();
  const producers = useAppSelector((state) => state.producerSlice.producers);

  const [producerName, setProducerName] = useState('');
  const [producerAddress, setProducerAddress] = useState('');
  const [producerPhone, setProducerPhone] = useState('');
  const [producerWebsite, setProducerWebsite] = useState('');
  const [producerEmail, setProducerEmail] = useState('');
  const [isError, setIsError] = useState(false);

  const handleProducerNameInput = (name: string) => {
    if (name.length > 0) {
      setIsError(false);
    }
    setProducerName(name);
  };

  const handleAddProducer = useCallback(() => {
    if (producerName.length === 0) {
      setIsError(true);
      return;
    }

    createProducer({
      name: producerName,
      address: producerAddress,
      phone: producerPhone,
      website: producerWebsite,
      email: producerEmail,
    });

    setProducerName('');
    setProducerAddress('');
    setProducerPhone('');
    setProducerWebsite('');
    setProducerEmail('');
  }, [
    producerName,
    producerAddress,
    producerPhone,
    producerWebsite,
    producerEmail,
    createProducer,
    setIsError,
  ]);

  const handleDeleteProducer = useCallback(
    (id: number) => {
      deleteProducer({ id });
    },
    [deleteProducer],
  );

  const handleChangeSelectedLiterature = useCallback(
    (producer: ProducerType) => {
      setProducerName(producer.name);
      setProducerAddress(producer.address);
      setProducerPhone(producer.phone);
      setProducerWebsite(producer.website);
      setProducerEmail(producer.email);
    },
    [setProducerName, setProducerAddress, setProducerPhone, setProducerWebsite, setProducerEmail],
  );

  return (
    <SProducer>
      <SProducerHeader>
        <SHeaderContent>
          <Typography fontSize={theme.fontSizes.xxl} fontWeight={500}>
            Производитель
          </Typography>
          <Spacer marginRight={40} />
          <InputField
            defaultValue={producerName}
            onChange={handleProducerNameInput}
            placeholder="Наименование"
            withBorder
            error={isError ? IS_OBLIGATORY_FIELD_ERROR : null}
          />
        </SHeaderContent>
        <SHeaderButtonContainer>
          <Button
            onClick={handleAddProducer}
            color={theme.colors.white}
            backgroundColor={theme.colors.blue}
            hoverBackground={theme.colors.darkBlue}>
            Добавить информацию
          </Button>
        </SHeaderButtonContainer>
      </SProducerHeader>
      <Spacer height={10} />
      <SProducerContent>
        <SAddProducerContent>
          <SInputsContainer>
            <InputField
              defaultValue={producerAddress}
              onChange={setProducerAddress}
              label="Адрес"
              placeholder="Адрес"
            />
            <Spacer marginRight={20} />
            <InputField
              defaultValue={producerPhone}
              onChange={setProducerPhone}
              placeholder="Номер телефона"
              label="Номер телефона"
            />
          </SInputsContainer>
          <Spacer height={40} />
          <SInputsContainer>
            <InputField
              defaultValue={producerWebsite}
              onChange={setProducerWebsite}
              placeholder="Веб сайт"
              label="Веб сайт"
            />
            <Spacer marginRight={20} />
            <InputField
              defaultValue={producerEmail}
              onChange={setProducerEmail}
              placeholder="Email"
              label="Email"
            />
          </SInputsContainer>
        </SAddProducerContent>

        <Spacer height={50} />

        <SLiteratureListContainer>
          <Typography fontSize={theme.fontSizes.lg} fontWeight={500}>
            Доступные производители:
          </Typography>

          <Spacer height={20} />

          <GetInfoList
            data={producers}
            deleteItemHandler={handleDeleteProducer}
            itemClickHandler={handleChangeSelectedLiterature}
          />
        </SLiteratureListContainer>

        <Spacer height={20} />
      </SProducerContent>
    </SProducer>
  );
};

const SProducer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;
  min-height: 100%;
`;

const SProducerHeader = styled.div`
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

const SProducerContent = styled.div`
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

const SAddProducerContent = styled.div`
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

export default Producer;
