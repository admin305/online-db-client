import React, { useCallback, useEffect, useState } from 'react';
import theme from 'theme';

import styled from 'styled-components';

import Spacer from 'components/Spacer';

import LogoIcon from './icons/LogoIcon';
import ExitIcon from './icons/ExitIcon';
import UniversityTextIcon from './icons/UniversityTextIcon';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import Typography from './Typography';
import PlusIcon from './icons/PlusIcon';
import List from './List';

const LIST_ITEMS = [
  { label: 'Добавить датчик', route: '../add-sensor' },
  { label: 'Добавить прибор', route: '../add-device' },
  { label: 'Производитель', route: '../producer' },
  { label: 'Литература', route: '../literature' },
  { label: 'Среда измерения', route: '../environment' },
  { label: 'Область применения', route: '../application-sphere' },
  { label: 'Технология изготовления', route: '../manufacturing-technology' },
  { label: 'Принцип действия', route: '../operation-principle' },
  { label: 'Чувствительный элемент', route: '../sensitive-element' },
  { label: 'Характер выходного сигнала', route: '../output-signal' },
  { label: 'Характер преобразования сигнала', route: '../signal-conversation' },
  { label: 'Тип устройства', route: '../type' },
  { label: 'Назначение', route: '../prupose' },
  { label: 'Способ управления', route: '../control-type' },
];

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isAddInfoListVisible, setIsAddInfoListVisible] = useState(false);

  const handleNavigation = useCallback(
    (route: string) => {
      return navigate(route);
    },
    [navigate],
  );

  useEffect(() => {
    console.log(isAddInfoListVisible);
  }, [isAddInfoListVisible]);

  return (
    <SHeader id="header-root">
      <SHeaderContent>
        <SIconContainer>
          <SIconContainer>
            <Button
              onClick={() => handleNavigation('../')}
              backgroundColor="transparent"
              hoverBackground="transparent">
              <LogoIcon />
            </Button>
          </SIconContainer>
          <Spacer marginRight={20} height={10} />
          <SIconContainer>
            <UniversityTextIcon />
          </SIconContainer>
        </SIconContainer>
        <SRightContentContainer>
          <SUserStatus onClick={() => handleNavigation('../admin')}>
            <Typography color={theme.colors.statusBlue} fontSize={14}>
              Администратор
            </Typography>
          </SUserStatus>
          <Spacer marginRight={10} />
          <SIconContainer>
            <Button
              onClick={() => {
                console.log(isAddInfoListVisible);
                setIsAddInfoListVisible(true);
              }}
              backgroundColor="transparent"
              hoverBackground="rgba(55,125,255,.1)">
              <PlusIcon fill={theme.colors.lightGray} />
            </Button>
          </SIconContainer>
          {isAddInfoListVisible && (
            <SListContainer>
              <List data={LIST_ITEMS} setListVisible={setIsAddInfoListVisible} />
            </SListContainer>
          )}
          <SExitIconContainer>
            <Button
              onClick={() => handleNavigation('../auth')}
              backgroundColor="transparent"
              hoverBackground="rgba(55,125,255,.1)">
              <ExitIcon />
            </Button>
          </SExitIconContainer>
        </SRightContentContainer>
      </SHeaderContent>
    </SHeader>
  );
};

const SHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 120px;

  background: ${theme.colors.white};
`;

const SHeaderContent = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  width: 70%;
`;

const SRightContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SExitIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 44px;
  height: 44px;
  border-radius: 5px;
`;

const SIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 44px;
`;

const SUserStatus = styled.button`
  padding: 5px;

  background: ${theme.colors.statusBlueBackground};
  border: 1px solid ${theme.colors.statusBlueBorder};
  border-radius: 2px;
  cursor: pointer;
`;

const SListContainer = styled.div`
  position: absolute;
  top: 10%;
  left: 65%;

  width: 400px;
  z-index: 1;
`;

export default Header;
