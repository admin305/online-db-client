import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import theme from "theme";

import styled from "styled-components";

import Button from "components/Button";
import InputField from "components/InputField";
import Typography from "components/Typography";
import { AuthPayload } from "types";

interface AuthForm {
  onSubmit: (data: AuthPayload) => void;
}

const AuthForm: React.FC<AuthForm> = ({ onSubmit }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitForm = useCallback(() => {
    onSubmit({ email: userName, password });
  }, [userName, password]);

  return (
    <SAuthForm>
      <STitleContainer>
        <STypographyContainer>
          <Typography fontWeight={500} fontSize={theme.fontSizes.xxl}>
            Авторизация
          </Typography>
        </STypographyContainer>
        <Typography color={theme.colors.grayText}>
          Пожалуйста авторизуйтесь:
        </Typography>
      </STitleContainer>
      <SInputFieldContainer>
        <InputField
          placeholder="Email"
          defaultValue={userName}
          type="email"
          label="Логин:"
          onChange={setUserName}
        />
      </SInputFieldContainer>
      <SInputFieldContainer>
        <InputField
          defaultValue={password}
          type="password"
          label="Пароль:"
          onChange={setPassword}
        />
      </SInputFieldContainer>
      <SButtonContainer>
        <Button
          onClick={handleSubmitForm}
          color={theme.colors.white}
          backgroundColor={theme.colors.blue}
        >
          Войти
        </Button>
      </SButtonContainer>
      <SRegistrationLinkContainer>
        <Typography color={theme.colors.grayText}>
          {`Если вы впервые на сайте, заполните, пожалуйста, регистрационную
          форму. `}
        </Typography>
        <Link to="/registration">
          <Typography fontWeight={600} color={theme.colors.blue}>
            Зарегистрироваться
          </Typography>
        </Link>
      </SRegistrationLinkContainer>
    </SAuthForm>
  );
};

const SAuthForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 30%;
`;

const STitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  margin-bottom: 48px;
`;

const STypographyContainer = styled.div`
  margin-bottom: 8px;
`;

const SInputFieldContainer = styled.div`
  width: 100%;
  margin-bottom: 24px;
`;

const SButtonContainer = styled.div`
  width: 100%;
  height: 46px;
  margin-bottom: 16px;
`;

const SRegistrationLinkContainer = styled.div`
  text-align: center;
`;

export default AuthForm;
