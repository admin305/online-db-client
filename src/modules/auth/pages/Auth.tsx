import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import theme from 'theme';

import styled from 'styled-components';

import { AuthPayload } from 'types';
import { authApi } from '../services/AuthApi';

import AuthForm from '../components/AuthForm';
import { AuthResponse } from 'types';

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [authUser, { error }] = authApi.useAuthUserMutation();
  const handleSubmit = useCallback(
    async (loginData: AuthPayload) => {
      const response = await authUser(loginData);

      if ('data' in response) {
        localStorage.setItem('token', response.data.token);
        navigate('/', { replace: true });
      }
    },
    [authUser],
  );

  return (
    <SAuth>
      <AuthForm onSubmit={handleSubmit} />
    </SAuth>
  );
};

const SAuth = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;

  background: ${theme.colors.backgroundLightBlueColor};
`;

export default Auth;
