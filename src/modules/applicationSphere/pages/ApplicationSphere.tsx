import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppSelector } from 'hooks/redux';
import theme from 'theme';

import styled from 'styled-components';

import Typography from 'components/Typography';
import InputField from 'components/InputField';
import Button from 'components/Button';
import Spacer from 'components/Spacer';

import { applicationSphereApi } from '../servises/ApplicationSphereApi';
import { ApplicationSphereType } from '../types';
import ApplicationList from '../components/ApplicationList';

const ApplicationSphere: React.FC = () => {
  const [createApplicationSphere] = applicationSphereApi.useCreateApplicationSphereMutation();
  const [removeApplicationSphere] = applicationSphereApi.useDeleteApplicationSphereMutation();
  const applicationSpheres = useAppSelector(
    (state) => state.applicationSphereSlice.applicationSpheres,
  );

  const [sphereValue, setSphereValue] = useState('');

  const handleAddSphere = useCallback(() => {
    createApplicationSphere({ name: sphereValue });
    setSphereValue('');
  }, [sphereValue, createApplicationSphere]);

  const handleDeleteSphere = useCallback((id: number) => {
    removeApplicationSphere({ id });
  }, []);

  const sortApplicationSpheres = useMemo(() => {
    return ([] as ApplicationSphereType[]).concat(applicationSpheres).sort();
  }, [applicationSpheres]);

  return (
    <SApplicatinSphere>
      <SApplicationSphereHeader>
        <SHeaderContent>
          <Typography fontSize={theme.fontSizes.xxl} fontWeight={500}>
            Область применения
          </Typography>
          <Spacer marginRight={40} />
          <SInputContainer>
            <InputField
              defaultValue={sphereValue}
              onChange={setSphereValue}
              placeholder="Наименование"
              withBorder
            />
          </SInputContainer>
        </SHeaderContent>

        <SHeaderButtonContainer>
          <Button
            onClick={handleAddSphere}
            color={theme.colors.white}
            backgroundColor={theme.colors.blue}
            hoverBackground={theme.colors.darkBlue}>
            Добавить информацию
          </Button>
        </SHeaderButtonContainer>
      </SApplicationSphereHeader>
      <Spacer height={20} />

      <SApplicationSphereContent>
        <SApplicationListContainer>
          <ApplicationList
            data={sortApplicationSpheres}
            deleteApplicationHandle={handleDeleteSphere}
          />
        </SApplicationListContainer>
        <Spacer height={50} />
      </SApplicationSphereContent>
    </SApplicatinSphere>
  );
};

const SApplicatinSphere = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;
  min-height: 100%;
`;

const SApplicationSphereContent = styled.div`
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

const SApplicationSphereHeader = styled.div`
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

  width: 80%;
`;

const SInputContainer = styled.div`
  width: 50%;
  height: 45px;
`;

const SApplicationListContainer = styled.div`
  width: 70%;
`;

// const SApplicationSphereContent = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;

//   width: 50%;
// `;

const SButtonContainer = styled.div<{ width: string }>`
  width: ${(props) => props.width};
`;

const SHeaderButtonContainer = styled.div`
  width: 20%;
  height: 45px;
`;

const STypographyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 35px;
  padding: 10px;
  box-sizing: border-box;
  background: ${theme.colors.white};
  border-radius: 5px;
`;

const STextContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`;

export default ApplicationSphere;
