import React from "react";
import { useNavigate } from "react-router-dom";
import theme from "theme";

import styled from "styled-components";

import Typography from "components/Typography";
import Button from "components/Button";
import Spacer from "components/Spacer";
import SuccessRegistrationIcon from "components/icons/SuccessRegistrationIcon";

const RegistrationSuccess: React.FC = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("../auth");
  };

  return (
    <SSuccessRegistration>
      <SSuccessRegistrationIcon>
        <SuccessRegistrationIcon />
      </SSuccessRegistrationIcon>
      <SContentContainer>
        <Typography
          color={theme.colors.defaultTextColor}
          fontSize={theme.fontSizes.xxl}
          fontWeight={600}
        >
          Вы были успешно зарегистрированы
        </Typography>
        <Spacer height={40} />
        <SSubTitleContainer>
          <Typography
            color={theme.colors.grayText}
            fontSize={theme.fontSizes.md}
          >
            На указанный в форме e-mail придет запрос на подтверждение
            регистрации.
          </Typography>
        </SSubTitleContainer>
        <Spacer height={40} />
        <SButtonContainer>
          <Button
            color={theme.colors.white}
            backgroundColor={theme.colors.blue}
            onClick={handleButtonClick}
          >
            Авторизация
          </Button>
        </SButtonContainer>
      </SContentContainer>
    </SSuccessRegistration>
  );
};

const SSuccessRegistration = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
`;

const SContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;

const SButtonContainer = styled.div`
  width: 135px;
  height: 45px;
`;

const SSubTitleContainer = styled.div`
  flex-wrap: wrap;
  text-align: center;

  width: 70%;
`;

const SSuccessRegistrationIcon = styled.div`
  svg {
    width: 65%;
    height: 65%;
  }
`;

export default RegistrationSuccess;
