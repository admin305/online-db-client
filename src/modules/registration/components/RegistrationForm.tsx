import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import theme from "theme";

import styled from "styled-components";

import { UserRegistrationData } from "types";
import Button from "components/Button";
import InputField from "components/InputField";
import Typography from "components/Typography";
import Spacer from "components/Spacer";
import ArrowIcon from "components/icons/ArrowIcon";

interface RegistrationFormProps {
  onSubmit: (data: UserRegistrationData) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit }) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [login, setLogin] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  const handleSubmitForm = useCallback(() => {
    onSubmit({ name: firstName, sername: lastName, login, email, password });
  }, [firstName, lastName, login, email, password]);

  return (
    <SRegistrationForm>
      <STitleContainer>
        <STypographyContainer>
          <Typography fontWeight={500} fontSize={theme.fontSizes.xxl}>
            Регистрация
          </Typography>
        </STypographyContainer>
        <SRegistrationLinkContainer>
          <Typography
            fontSize={theme.fontSizes.md}
            color={theme.colors.grayText}
          >
            {`Уже зарегистрированы? `}
          </Typography>

          <Spacer marginRight={5} />

          <Link to="/auth">
            <SLinkContent>
              <Typography
                fontSize={theme.fontSizes.md}
                fontWeight={600}
                color={theme.colors.blue}
              >
                Авторизация
              </Typography>
              <Spacer marginRight={5} />
              <ArrowIcon width={6} height={10} />
            </SLinkContent>
          </Link>
        </SRegistrationLinkContainer>
      </STitleContainer>
      <SInputFieldContainer>
        <InputField
          defaultValue={firstName}
          type="text"
          label="Имя:"
          onChange={setFirstName}
        />

        <Spacer marginRight={15} />

        <InputField
          defaultValue={lastName}
          type="text"
          label="Фамилия:"
          onChange={setLastName}
        />
      </SInputFieldContainer>
      <SInputFieldContainer>
        <InputField
          defaultValue={login}
          type="text"
          label="Логин(мин. 3 символа):"
          onChange={setLogin}
        />

        <Spacer marginRight={15} />

        <InputField
          defaultValue={email}
          type="email"
          label="Email:"
          onChange={setEmail}
        />
      </SInputFieldContainer>
      <SInputFieldContainer>
        <InputField
          defaultValue={password}
          type="password"
          label="Пароль:"
          onChange={setPassword}
        />

        <Spacer marginRight={15} />

        <InputField
          defaultValue={passwordConfirm}
          type="password"
          label="Подтверждение пароля:"
          onChange={setPasswordConfirm}
        />
      </SInputFieldContainer>
      <SButtonContainer>
        <Button
          onClick={handleSubmitForm}
          color={theme.colors.white}
          backgroundColor={theme.colors.blue}
        >
          Регистрация
        </Button>
      </SButtonContainer>
    </SRegistrationForm>
  );
};

const SRegistrationForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 50%;
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 24px;
`;

const SButtonContainer = styled.div`
  align-self: flex-start;

  width: 30%;
  height: 46px;
  margin-bottom: 16px;
`;

const SRegistrationLinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const SLinkContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default RegistrationForm;
