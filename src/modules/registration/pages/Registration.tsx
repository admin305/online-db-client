import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import theme from "theme";

import styled from "styled-components";

import { UserRegistrationData } from "types";

import Typography from "components/Typography";

import RegistrationForm from "../components/RegistrationForm";
import { registrationApi } from "../services/RegistrationApi";

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const [registrationUser, { error }] =
    registrationApi.useRegistrationUserMutation();

  const handleRegistrationSubmit = useCallback(
    async (registrationData: UserRegistrationData) => {
      const response = await registrationUser(registrationData);

      if ("data" in response) {
        navigate("/success");
      }
    },
    [registrationUser]
  );

  return (
    <SRegistration>
      {error && <Typography>{"error"}</Typography>}
      <RegistrationForm onSubmit={handleRegistrationSubmit} />
    </SRegistration>
  );
};

const SRegistration = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  background: ${theme.colors.backgroundLightBlueColor};
`;

export default Registration;
