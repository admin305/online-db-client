import React, { MouseEvent, useEffect, useRef } from 'react';
import theme from 'theme';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import Typography from './Typography';

interface ListProps {
  data: Record<string, string>[];
  setListVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const List: React.FC<ListProps> = ({ data, setListVisible }) => {
  const navigate = useNavigate();
  const listRef = useRef(null);

  const handleOutsideClick = (event: any) => {
    const path = event.path || (event.composedPath && event.composedPath());

    if (!path.includes(listRef.current)) {
      setListVisible(false);
    }
  };

  const handleItemClick = (item: Record<string, string>) => {
    setListVisible(false);
    navigate(item.route);
  };

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);

    return () => document.body.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <SList ref={listRef}>
      {data.map((item, index) => (
        <SListItem key={`${index}${item}`} onClick={() => handleItemClick(item)}>
          <Typography>{item.label}</Typography>
        </SListItem>
      ))}
    </SList>
  );
};

const SList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  height: 500px;
  overflow: auto;

  background: ${theme.colors.white};
  border-radius: 5px;
  transition: all 0.5s easy-in-out;
  box-shadow: 0 0 16px 0 ${theme.colors.borderColor};
`;

const SListItem = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  width: 100%;
  height: 65px;
  padding-left: 10px;
  box-sizing: border-box;
  background: ${theme.colors.white};
  outline: none;
  border: none;

  cursor: pointer;
  transition: all 0.5s easy-in-out;

  &:hover {
    background: ${theme.colors.backgroundLightBlueColor};
  }
`;

export default List;
