import React from "react";
import theme from "theme";

import styled from "styled-components";

import Button from "components/Button";
import Typography from "components/Typography";
import Spacer from "components/Spacer";

import { ApplicationSphereType } from "../types";
import { setFirstLetterUppercase } from "../helpers/setFirstLetterUppercase";

interface ApplicationListProps {
  data: ApplicationSphereType[];
  deleteApplicationHandle: (id: number) => void;
}

const ApplicationList: React.FC<ApplicationListProps> = ({
  data,
  deleteApplicationHandle,
}) => {
  return (
    <SApplicationList>
      {data.map((item, index) => (
        <>
          <SApplicationItem>
            <SItemTextContainer>
              <Typography>{setFirstLetterUppercase(item.name)}</Typography>
            </SItemTextContainer>

            <Spacer marginRight={20} />

            <SButtonContainer>
              <Button
                onClick={() => deleteApplicationHandle(item.id)}
                backgroundColor={theme.colors.red}
                hoverBackground={theme.colors.darkRed}
              >
                <Typography color={theme.colors.white}>Удалить</Typography>
              </Button>
            </SButtonContainer>
          </SApplicationItem>

          {index < data.length - 1 && <Spacer height={20} />}
        </>
      ))}
    </SApplicationList>
  );
};

const SApplicationList = styled.div`
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

const SApplicationItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 65px;
  padding: 10px;
  box-sizing: border-box;
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

export default ApplicationList;
