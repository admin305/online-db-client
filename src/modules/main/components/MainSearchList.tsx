import React, { useCallback } from 'react';
import theme from 'theme';

import styled from 'styled-components';

import { Device, Sensor } from '../types';
import Typography from 'components/Typography';
import { useNavigate } from 'react-router-dom';

interface MainSearchListProps {
  data: Sensor[] | Device[];
  isSensorSearchActive: boolean;
}

const MainSearchList: React.FC<MainSearchListProps> = ({ data, isSensorSearchActive }) => {
  const navigate = useNavigate();

  const handleSensorNavigate = useCallback(
    (item) => {
      navigate('/sensor', { state: { id: item.id } });
    },
    [navigate],
  );
  const handleDeviceNavigate = useCallback(
    (item) => {
      navigate('/device', { state: { id: item.id } });
    },
    [navigate],
  );

  return (
    <SSearchList>
      {data.map((item, index) => (
        <SSearchListItem
          onClick={() => {
            if (isSensorSearchActive) {
              return handleSensorNavigate(item);
            }
            return handleDeviceNavigate(item);
          }}
          withTopBorderRadius={index === 0}
          withBottomBorderRadius={index === data.length - 1}>
          <SItemContent>
            <Typography>{item.name}</Typography>
          </SItemContent>

          <SItemContent>
            <Typography>{`${item.measure_min} - ${item.measure_max} ${item.unit_of_measuring}`}</Typography>
          </SItemContent>

          <SItemContent>
            <Typography>{`${item.resource} ч.`}</Typography>
          </SItemContent>

          <SItemContent>
            <Typography>{`${item.weight} ${item.unit_of_weight}.`}</Typography>
          </SItemContent>
        </SSearchListItem>
      ))}
    </SSearchList>
  );
};

const SSearchList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;
  margin-top: 20px;
  border-radius: 8px;
  background: ${theme.colors.white};
  box-shadow: 0 0 16px 0 ${theme.colors.borderColor};
`;

const SSearchListItem = styled.button<{
  withTopBorderRadius: boolean;
  withBottomBorderRadius: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-around;

  height: 65px;
  width: 100%;

  outline: none;
  border: none;
  cursor: pointer;
  background: ${theme.colors.white};
  ${(props) =>
    props.withTopBorderRadius &&
    `border-top-left-radius: 8px;
  border-top-right-radius: 8px;`}
  ${(props) =>
    props.withBottomBorderRadius &&
    `border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  `}

  transition: background 0.25s ease-in-out;

  &:hover {
    background: ${theme.colors.backgroundLightBlueColor};
  }
`;

const SItemContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 20%;
`;

export default MainSearchList;
