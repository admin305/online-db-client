import React from 'react';
import theme from '../theme';

import styled from 'styled-components';

interface ButtonProps {
  children: React.ReactChild;
  color?: string;
  backgroundColor?: string;
  hoverBackground?: string;
  borderColor?: string;
  withHoverBorder?: boolean;
  onClick: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  color,
  backgroundColor,
  hoverBackground,
  borderColor,
  withHoverBorder = false,
  onClick,
}) => {
  return (
    <SButton
      onClick={(event) => onClick(event)}
      color={color}
      backgroundColor={backgroundColor}
      hoverBackground={hoverBackground}
      borderColor={borderColor}
      withHoverBorder={withHoverBorder}>
      {children}
    </SButton>
  );
};

const SButton = styled.button<{
  withHoverBorder: boolean;
  borderColor?: string;
  color?: string;
  backgroundColor?: string;
  hoverBackground?: string;
}>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  border-radius: 6px;
  outline: none;
  border: 1px solid transparent;

  font-size: 16px;
  font-weight: 400;
  text-align: center;

  color: ${(props) => (props.color ? props.color : theme.colors.defaultTextColor)};
  background: ${(props) => (props.backgroundColor ? props.backgroundColor : theme.colors.white)};

  transition: all 0.2s ease-in-out;

  border: 1px solid ${(props) => (props.borderColor ? props.borderColor : theme.colors.transparent)};

  &:hover {
    cursor: pointer;
    background: ${(props) =>
      props.hoverBackground ? props.hoverBackground : theme.colors.darkBlue};
    border-color: ${(props) =>
      props.withHoverBorder ? theme.colors.borderDarkBlue : 'transparent'};
    ${(props) => props.withHoverBorder && ` box-shadow: 0 4px 11px ${theme.colors.shadowColor};`}
  }
`;

export default Button;
