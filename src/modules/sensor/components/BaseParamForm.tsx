import React, { useState } from 'react';
import theme from 'theme';

import Typography from 'components/Typography';
import Spacer from 'components/Spacer';
import Dropdown from 'components/Dropdown';
import InputField from 'components/InputField';

type SelectOptions = {
  name: string;
};

interface BaseParamFormProps {
  deviceTypes: SelectOptions[];
  sensetiveElements: SelectOptions[];
  operationPrinciples: SelectOptions[];
  outputSignals: SelectOptions[];
  signalConversations: SelectOptions[];
  manufacturingsTechnologys: SelectOptions[];
  errorRateValue: string;
  // Поправить тип
  onChange: React.Dispatch<React.SetStateAction<any>>;
}

const BaseParamForm: React.FC<BaseParamFormProps> = ({
  deviceTypes,
  sensetiveElements,
  operationPrinciples,
  outputSignals,
  signalConversations,
  manufacturingsTechnologys,
  errorRateValue,
  onChange,
}) => {
  return (
    <>
      <Typography fontSize={theme.fontSizes.lg} fontWeight={500}>
        Основные параметры
      </Typography>

      <Spacer height={20} />

      <Dropdown
        options={deviceTypes}
        label="Тип датчика"
        labelColor={theme.colors.black}
        onChange={(event) => onChange((prev: any) => ({ ...prev, type: event.target.value }))}
      />
      <Spacer height={10} />
      <Dropdown
        options={sensetiveElements}
        label="Чувствительный элемент"
        labelColor={theme.colors.black}
        onChange={(event) =>
          onChange((prev: any) => ({ ...prev, sensitive_element: event.target.value }))
        }
      />
      <Spacer height={10} />
      <Dropdown
        options={operationPrinciples}
        label="Принцип действия"
        labelColor={theme.colors.black}
        onChange={(event) =>
          onChange((prev: any) => ({ ...prev, operation_principle: event.target.value }))
        }
      />
      <Spacer height={10} />
      <Dropdown
        options={outputSignals}
        label="Характер выходного сигнала"
        labelColor={theme.colors.black}
        onChange={(event) =>
          onChange((prev: any) => ({ ...prev, output_signal: event.target.value }))
        }
      />
      <Spacer height={10} />
      <Dropdown
        options={signalConversations}
        label="Характер преобразования сигнала"
        labelColor={theme.colors.black}
        onChange={(event) =>
          onChange((prev: any) => ({ ...prev, signal_conversation: event.target.value }))
        }
      />
      <Spacer height={10} />
      <Dropdown
        options={manufacturingsTechnologys}
        label="Технология изготовления"
        labelColor={theme.colors.black}
        onChange={(event) =>
          onChange((prev: any) => ({ ...prev, manufacturing_technology: event.target.value }))
        }
      />
      <Spacer height={10} />

      <InputField
        defaultValue={errorRateValue}
        label="Погрешность измерения, %"
        placeholder="Погрешность измерения, %"
        onChange={(value) =>
          onChange((prev: any) => ({ ...prev, measurement_error: Number(value) }))
        }
      />
    </>
  );
};

export default BaseParamForm;
