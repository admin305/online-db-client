import React from 'react';

import styled from 'styled-components';

interface SpacerProps {
  height?: number;
  marginRight?: number;
  marginLeft?: number;
}

const Spacer: React.FC<SpacerProps> = ({ height = 1, marginLeft = 0, marginRight = 0 }) => {
  return <SSpacer height={height} marginLeft={marginLeft} marginRight={marginRight} />;
};

const SSpacer = styled.div<{ height: number; marginRight: number; marginLeft: number }>`
  height: ${(props) => props.height}px;

  margin-right: ${(props) => props.marginRight}px;
  margin-left: ${(props) => props.marginLeft}px;
`;

export default Spacer;
