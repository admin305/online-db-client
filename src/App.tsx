import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

import styled from 'styled-components';

import Admin from 'modules/admin/pages/Admin';
import RegistrationSuccess from 'modules/registration/pages/RegistrationSuccess';
import Device from 'modules/device/pages/Device';
import Sensor from 'modules/sensor/pages/Sensor';

import Auth from './modules/auth/pages/Auth';
import Main from './modules/main/pages/Main';
import Registration from './modules/registration/pages/Registration';
import Header from './components/Header';
import AddSensor from 'modules/sensor/pages/AddSensor';
import ApplicationSphere from 'modules/applicationSphere/pages/ApplicationSphere';
import Literature from 'modules/literature/pages/Literature';
import Producer from 'modules/producer/pages/Producer';
import Environment from 'modules/environment/pages/Environment';
import ManufacturingTechnology from 'modules/manufacturingTechnology/pages/ManufacturingTechnology';
import OperationPrinciple from 'modules/operationPrinciple/pages/OperationPrinciple';
import SensitiveElement from 'modules/sensitiveElement/pages/SensitiveElement';
import OutputSignal from 'modules/outputSignal/pages/OutputSignal';
import SignalConversation from 'modules/signalConversation/pages/SignalConversation';
import Purpose from 'modules/purpose/pages/Purpose';
import Control from 'modules/controlType/pages/Control';
import DeviceTypeForm from 'modules/deviceType/pages/DeviceTypeForm';
import AddDevice from 'modules/device/pages/AddDevice';

const App: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/auth');
    }
  }, []);

  return (
    <SApp>
      <SHeaderContainer>
        <Header />
      </SHeaderContainer>
      <SContentContainer>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/success" element={<RegistrationSuccess />} />
          <Route path="/" element={<Main />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/add-device" element={<AddDevice />} />
          <Route path="/sensor" element={<Sensor />} />
          <Route path="/device" element={<Device />} />
          <Route path="/add-sensor" element={<AddSensor />} />
          <Route path="/application-sphere" element={<ApplicationSphere />} />
          <Route path="/literature" element={<Literature />} />
          <Route path="/producer" element={<Producer />} />
          <Route path="/environment" element={<Environment />} />
          <Route path="/manufacturing-technology" element={<ManufacturingTechnology />} />
          <Route path="/operation-principle" element={<OperationPrinciple />} />
          <Route path="/sensitive-element" element={<SensitiveElement />} />
          <Route path="/output-signal" element={<OutputSignal />} />
          <Route path="/signal-conversation" element={<SignalConversation />} />
          <Route path="/prupose" element={<Purpose />} />
          <Route path="/control-type" element={<Control />} />
          <Route path="/type" element={<DeviceTypeForm />} />
        </Routes>
      </SContentContainer>
    </SApp>
  );
};

const SApp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100vw;
  height: 100vh;

  margin: 0;
  padding: 0;

  box-sizing: border-box;
`;

const SHeaderContainer = styled.div`
  width: 100%;
  height: 15%;
`;

const SContentContainer = styled.div`
  width: 100%;
  height: 85%;
`;

export default App;
