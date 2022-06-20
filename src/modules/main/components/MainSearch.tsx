import React, { useCallback, useEffect, useState } from 'react';
import { Transition } from 'react-transition-group';
import theme from 'theme';

import styled from 'styled-components';

import CloseIcon from 'components/icons/CloseIcon';
import QuestionImage from 'components/icons/QuestionImage';
import Spacer from 'components/Spacer';
import Button from 'components/Button';

import MainSearchInput from './MainSearchInput';
import MainSearchList from './MainSearchList';
import { Sensor, Device } from '../types';

interface MainSearchProps {
  isActive: boolean;
  sensorData: Sensor[];
  deviceData: Device[];
  isSensorSearchActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainSearch: React.FC<MainSearchProps> = ({
  isActive,
  sensorData,
  deviceData,
  isSensorSearchActive,
  setIsActive,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchData, setSearchData] = useState(isSensorSearchActive ? sensorData : deviceData);

  const handleSearch = useCallback(
    (searchValue: string) => {
      setSearchValue(searchValue);

      const regex = new RegExp(searchValue, 'i');

      if (isSensorSearchActive) {
        setSearchData(
          sensorData.filter(
            (item: Sensor) =>
              regex.test(`${item.measure_min} - ${item.measure_max} ${item.unit_of_measuring}`) ||
              regex.test(item.name) ||
              regex.test(String(item.resource)),
          ),
        );
      } else {
        setSearchData(
          deviceData.filter(
            (item: Device) =>
              regex.test(`${item.measure_min} - ${item.measure_max} ${item.unit_of_measuring}`) ||
              regex.test(item.name) ||
              regex.test(String(item.resource)),
          ),
        );
      }
    },
    [sensorData, deviceData, isSensorSearchActive, setSearchValue],
  );

  return (
    <Transition in={isActive} timeout={500} mountOnEnter unmountOnExit>
      {(state) => (
        <SMainSearchContainer state={state}>
          <SSearchContent>
            <SSearchInputContainer>
              <SCloseButton onClick={() => setIsActive(false)}>
                <CloseIcon />
              </SCloseButton>

              <Spacer height={35} />

              <MainSearchInput
                searchValue={searchValue}
                onChangeValue={(value) => handleSearch(value)}
                onClick={() => console.log('123')}
              />

              <Spacer height={35} />

              {searchValue ? (
                <MainSearchList data={searchData} isSensorSearchActive={isSensorSearchActive} />
              ) : (
                <SQuestionIconContainer>
                  <QuestionImage />
                </SQuestionIconContainer>
              )}
            </SSearchInputContainer>
          </SSearchContent>
        </SMainSearchContainer>
      )}
    </Transition>
  );
};

const SMainSearchContainer = styled.div<{ state: string }>`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  z-index: 10;

  transition: 0.5s;
  transform: translateY(
    ${({ state }) => {
      switch (state) {
        case 'entering':
          return -600;
        case 'entered':
          return 0;
        case 'exiting':
          return -600;
        case 'exited':
          return 0;
      }
    }}px
  );
`;

const SSearchContent = styled.div`
  position: relative;

  display: flex;
  align-items: flex-start;
  justify-content: center;

  width: 100%;
  padding: 20px 0;
  min-height: 50vh;

  background: ${theme.colors.backgroundLightColor};
`;

const SSearchInputContainer = styled.div`
  position: relative;
  width: 40%;
`;

const SCloseButton = styled.button`
  position: absolute;
  top: 0;
  right: -10px;

  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`;

const SQuestionIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 250px;
    height: 250px;
  }
`;

export default MainSearch;
