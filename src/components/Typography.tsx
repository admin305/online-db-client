import React from "react";
import theme from "../theme";

import styled from "styled-components";

interface TypographyProps {
  children: string;
  color?: string;
  fontWeight?: number;
  fontSize?: number;
  hoverColor?: string;
}

const Typography: React.FC<TypographyProps> = ({
  children,
  fontWeight,
  fontSize,
  color,
  hoverColor,
}) => {
  return (
    <STypography
      fontWeight={fontWeight}
      fontSize={fontSize}
      color={color}
      hoverColor={hoverColor}
    >
      {children}
    </STypography>
  );
};

const STypography = styled.span<{
  fontWeight?: number;
  fontSize?: number;
  color?: string;
  hoverColor?: string;
}>`
  color: ${(props) => (props.color ? props.color : theme.colors.black)};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 400)};
  font-size: ${(props) => (props.fontSize ? props.fontSize : 16)}px;

  transition: color 0.2s ease-in-out;

  ${(props) =>
    props.hoverColor &&
    ` &:hover {
        color: ${props.hoverColor};
  }`}
`;

export default Typography;
