import React from 'react';

import styled from 'styled-components';
import Spacer from './Spacer';

interface CheckboxProps {
  label: string;
  value: boolean;
  onChange: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, value, onChange }) => {
  return (
    <SCheckbox>
      <SCheckboxLabel>
        <SCheckboxInput type="checkbox" checked={value} onChange={onChange} />
        <Spacer marginRight={5} />
        {label}
      </SCheckboxLabel>
    </SCheckbox>
  );
};

const SCheckbox = styled.div``;

const SCheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  justfy-content: center;
`;

const SCheckboxInput = styled.input``;

export default Checkbox;
