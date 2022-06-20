import React from 'react';
import theme from 'theme';

import styled from 'styled-components';

import InputField from 'components/InputField';

interface MainSearchInputProps {
  searchValue: string;
  onChangeValue: (value: string) => void;
  onClick: () => void;
}

const MainSearchInput: React.FC<MainSearchInputProps> = ({
  searchValue,
  onChangeValue,
  onClick,
}) => {
  return (
    <SMainSearchInput>
      <InputField
        placeholder="Запрос..."
        defaultValue={searchValue}
        onChange={onChangeValue}
        withBorder={false}
      />
    </SMainSearchInput>
  );
};

const SMainSearchInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 60px;
  padding: 0 10px;
  border-radius: 6px;
  background: ${theme.colors.white};
  box-shadow: 0 0 16px 0 ${theme.colors.borderColor};
`;

const SButtonContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  width: 85px;
  height: 45px;
  transform: translate(-50%, -50%);
`;

export default MainSearchInput;
