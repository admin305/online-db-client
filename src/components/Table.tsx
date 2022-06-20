import React from 'react';

import styled from 'styled-components';
import theme from 'theme';
import Spacer from './Spacer';

interface Columns {
  title: string;
  key: string;
  render?: (value: string, id: number) => React.ReactNode;
}

interface TableProps {
  data: any[];
  columns: Columns[];
  onClick: (item: any) => void;
}

const Table: React.FC<TableProps> = ({ data, columns, onClick }) => {
  return (
    <STable>
      <STHead>
        <SRow>
          {columns.map((item) => (
            <SHeadCell key={item.key}>{item.title}</SHeadCell>
          ))}
        </SRow>
      </STHead>
      <STBody>
        {data.map((item) => (
          <SRow key={item.id} onClick={() => onClick(item)}>
            {columns.map((value) => (
              <SCell key={`${item.key}${value.key}`}>
                <Spacer height={10} />
                <> {value.render ? value.render(item[value.key], item.id) : item[value.key]}</>
                <Spacer height={10} />
              </SCell>
            ))}
          </SRow>
        ))}
      </STBody>
    </STable>
  );
};

const STable = styled.table`
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  background: ${theme.colors.white};
`;

const STHead = styled.thead``;

const STBody = styled.tbody``;

const SRow = styled.tr`
  height: 50px;
  cursor: pointer;
  transition: all 0.5s ease-in-out;

  &:hover {
    background: ${theme.colors.backgroundLightBlueColor};
  }
`;

const SHeadCell = styled.th``;

const SCell = styled.td`
  text-align: center;
  position: relative;
`;

export default Table;
