import React, { ChangeEvent } from "react";
import theme from "theme";

import styled from "styled-components";
import Typography from "./Typography";
import Spacer from "./Spacer";

interface TextareaProps {
  defaultValue: string;
  onChange: (value: string) => void;
  label?: string;
  labelColor?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  labelColor,
  defaultValue,
  onChange,
}) => {
  return (
    <STextareaContainer>
      {label && (
        <>
          <Typography color={labelColor ?? theme.colors.black}>
            {label}
          </Typography>
          <Spacer height={8} />
        </>
      )}

      <STextarea
        defaultValue={defaultValue}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
          onChange(event.target.value)
        }
      />
    </STextareaContainer>
  );
};

const STextareaContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const STextarea = styled.textarea`
  width: 100%;
  height: 100%;

  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.lightBorder};
  border-radius: 8px;
  resize: none;
  transition: all 0.5s ease-in-out;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${theme.colors.backgroundLightBlueColor};
  }
`;

export default Textarea;
