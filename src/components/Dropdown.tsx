import React, { useMemo } from 'react';
import theme from 'theme';

import styled from 'styled-components';

import Typography from './Typography';
import Spacer from './Spacer';

type SelectOptions = {
  name: string;
};

interface DropdownProps {
  label?: string;
  labelColor?: string;
  withoutBorder?: boolean;
  defaultValue?: string;
  options: SelectOptions[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  labelColor,
  withoutBorder,
  defaultValue,
  options,
  onChange,
}) => {
  const dropdownOptions = ([] as SelectOptions[]).concat({ name: 'Не выбрано' }, options);

  return (
    <SDropdown>
      {label && <Typography color={labelColor ?? theme.colors.white}>{label}</Typography>}

      <Spacer height={5} />

      <SDropdownSelect onChange={onChange} withoutBorder>
        {!defaultValue && (
          <SSelectOption value="Не выбрано" selected>
            Не выбрано
          </SSelectOption>
        )}

        {dropdownOptions.map((item) => (
          <SSelectOption value={item.name} selected={item.name === defaultValue}>
            {item.name}
          </SSelectOption>
        ))}
      </SDropdownSelect>
    </SDropdown>
  );
};

const SDropdown = styled.div`
  width: 100%;
`;

const SDropdownSelect = styled.select<{ withoutBorder: boolean }>`
  width: 100%;
  height: 40px;

  background-color: ${theme.colors.white};
  ${(props) => !props.withoutBorder && `border-style: solid;`}

  &:focus {
    outline: none;

    ${(props) =>
      !props.withoutBorder &&
      `border: 2px solid ${theme.colors.blue};
    box-shadow: 1px 1px ${theme.colors.blue};`}
  }
`;
const SSelectOption = styled.option`
  width: 100%;
  height: 40px;
`;

export default Dropdown;
