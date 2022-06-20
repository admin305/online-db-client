import React from "react";
import theme from "theme";

import styled from "styled-components";
import { OperationPrincipleType } from "../types";
import Button from "components/Button";
import Typography from "components/Typography";
import Spacer from "components/Spacer";

interface PrincipleListProps {
  data: OperationPrincipleType[];
  deletePrincipleHandle: (id: number) => void;
  changeCurrentPrincipleHandle: (item: OperationPrincipleType) => void;
}

const PrincipleList: React.FC<PrincipleListProps> = ({
  data,
  deletePrincipleHandle,
  changeCurrentPrincipleHandle,
}) => {
  return (
    <SPrincipleList>
      {data.map((item, index) => (
        <React.Fragment key={item.id}>
          <SPrincipleItem
            onClick={() => changeCurrentPrincipleHandle(item)}
          >
            <SItemTextContainer>
              <Typography>{item.name}</Typography>
            </SItemTextContainer>

            <Spacer marginRight={20} />

            <SButtonContainer>
              <Button
                onClick={() => deletePrincipleHandle(item.id)}
                backgroundColor={theme.colors.red}
                hoverBackground={theme.colors.darkRed}
              >
                <Typography color={theme.colors.white}>Удалить</Typography>
              </Button>
            </SButtonContainer>
          </SPrincipleItem>

          {index < data.length - 1 && <Spacer height={20} />}
        </React.Fragment>
      ))}
    </SPrincipleList>
  );
};

const SPrincipleList = styled.div`
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

const SPrincipleItem = styled.button`
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

export default PrincipleList;