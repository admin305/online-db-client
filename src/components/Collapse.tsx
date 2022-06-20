import React, { useState } from "react";
import theme from "theme";

import styled from "styled-components";
import Typography from "./Typography";
import ArrowIcon from "./icons/ArrowIcon";
import Spacer from "./Spacer";

interface CollapseProps {
  label: string;
  children: React.ReactNode;
}

const Collapse: React.FC<CollapseProps> = ({ label, children }) => {
  const [isContentVisible, setIsContentVisible] = useState(false);
  return (
    <SCollapse>
      <SCollapseHeader onClick={() => setIsContentVisible((prev) => !prev)}>
        <SCollapseIconContainer isContentVisible={isContentVisible}>
          <ArrowIcon fill={theme.colors.black} />
        </SCollapseIconContainer>
        <Spacer marginRight={15} />
        <Typography fontSize={24} fontWeight={500}>
          {label}
        </Typography>
      </SCollapseHeader>
      <Spacer height={20} />
      {isContentVisible && <SCollapseContent>{children}</SCollapseContent>}
    </SCollapse>
  );
};

const SCollapse = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;
`;

const SCollapseHeader = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  width: 100%;
  height: 50px;
  padding: 5px 0px 5px 15px;

  background: ${theme.colors.white};
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

const SCollapseIconContainer = styled.div<{ isContentVisible: boolean }>`
  transition: 0.5s;
  ${(props) => props.isContentVisible && "transform: rotate(90deg);"}
`;

const SCollapseContent = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;

  width: 100%;
  margin-left: 60px;
`;

export default Collapse;
