import React from "react";
import theme from "theme";

import styled from "styled-components";
import { EnvironmentType } from "../types";
import Button from "components/Button";
import Typography from "components/Typography";
import Spacer from "components/Spacer";

interface EnvironmentListProps {
  data: EnvironmentType[];
  deleteEnvironmentHandle: (id: number) => void;
  chengeCurrentEnvironmentHandle: (item: EnvironmentType) => void;
}

const EnvironmentList: React.FC<EnvironmentListProps> = ({
  data,
  deleteEnvironmentHandle,
  chengeCurrentEnvironmentHandle,
}) => {
  return (
    <SEnvironmentList>
      {data.map((item, index) => (
        <React.Fragment key={item.id}>
          <SEnvironmentItem
            onClick={() => chengeCurrentEnvironmentHandle(item)}
          >
            <SItemTextContainer>
              <Typography>{item.name}</Typography>
            </SItemTextContainer>

            <Spacer marginRight={20} />

            <SButtonContainer>
              <Button
                onClick={() => deleteEnvironmentHandle(item.id)}
                backgroundColor={theme.colors.red}
                hoverBackground={theme.colors.darkRed}
              >
                <Typography color={theme.colors.white}>Удалить</Typography>
              </Button>
            </SButtonContainer>
          </SEnvironmentItem>

          {index < data.length - 1 && <Spacer height={20} />}
        </React.Fragment>
      ))}
    </SEnvironmentList>
  );
};

const SEnvironmentList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;
  height: 100%;

  box-sizing: border-box;
  border-radius: 5px;

  background: ${theme.colors.white};
`;

const SEnvironmentItem = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 65px;
  padding: 10px;
  box-sizing: border-box;
  border: none;
  outline: none;
  background: ${theme.colors.white};
  border-radius: 5px;

  transition: all 0.2s ease-in-out;
  cursor: pointer;
  text-align: left;

  &:hover {
    background: ${theme.colors.backgroundLightColor};
  }
`;

const SItemTextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  width: 80%;
`;

const SButtonContainer = styled.div`
  width: 20%;
  height: 45px;
`;

export default EnvironmentList;
