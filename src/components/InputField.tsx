import React, { ChangeEvent } from 'react';
import theme from '../theme';

import styled from 'styled-components';

import Typography from './Typography';
import Spacer from './Spacer';

interface InputFieldProps {
  defaultValue: string;
  placeholder?: string;
  type?: string;
  label?: string;
  labelColor?: string;
  withBorder?: boolean;
  error?: string | null;
  disabled?: boolean;
  onChange: (value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  defaultValue,
  type = 'text',
  label,
  labelColor,
  withBorder,
  error,
  disabled,
  onChange,
}) => {
  return (
    <SInputContainer>
      {label && (
        <STypographyContainer>
          <Typography fontSize={theme.fontSizes.md} color={labelColor}>
            {label}
          </Typography>
          <Spacer height={8} />
        </STypographyContainer>
      )}
      <SInputField
        type={type}
        placeholder={placeholder}
        value={defaultValue}
        withBorder={withBorder}
        disabled={disabled}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
      />
      <Spacer height={5} />
      {error && (
        <STypographyContainer>
          <Typography color={theme.colors.red} fontSize={theme.fontSizes.sm}>
            {error}
          </Typography>
        </STypographyContainer>
      )}
    </SInputContainer>
  );
};

const SInputField = styled.input<{ withBorder?: boolean }>`
  width: 100%;
  height: 45px;
  box-sizing: border-box;

  padding: 10px;

  background: ${theme.colors.white};
  background-clip: padding-box;
  ${(props) =>
    props.withBorder ? `border: 1px solid ${theme.colors.fieldBorder};` : `border: none;`}

  border-radius: 5px;

  font-size: 16px;
  font-weight: 400;
  color: ${theme.colors.defaultTextColor};

  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:focus {
    outline: none;
    ${(props) => props.withBorder && `box-shadow: 0 0 16px 0 ${theme.colors.borderColor};`}
  }
`;

const SInputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 100%;
`;

const STypographyContainer = styled.div`
  align-self: flex-start;
`;

export default InputField;
