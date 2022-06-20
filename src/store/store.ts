import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authApi } from 'modules/auth/services/AuthApi';
import { registrationApi } from 'modules/registration/services/RegistrationApi';
import { adminApi } from 'modules/admin/services/AdminApi';

import userReducer from 'modules/admin/services/AdminSlice';
import applicationSphereSlice from 'modules/applicationSphere/servises/ApplicationSphereSlice';
import literatureSlice from 'modules/literature/services/LiteratureSlice';
import producerSlice from 'modules/producer/servises/ProducerSlice';
import environmentSlice from 'modules/environment/services/EnvironmentSlice';
import manufacturingTechnologySlice from 'modules/manufacturingTechnology/services/ManufacturingTechnologySlice';
import operationPrincipleSlice from 'modules/operationPrinciple/services/OperationPrincipleSlice';
import sensitiveElementSlice from 'modules/sensitiveElement/services/SensitiveElementSlice';
import outputSignalSlice from 'modules/outputSignal/services/OutputSignalSlice';
import signalConversationSlice from 'modules/signalConversation/services/SignalConversationSlice';
import purposeSlice from 'modules/purpose/services/PurposeSlice';
import controlTypeSlice from 'modules/controlType/services/ControlTypeSlice';
import deviceTypeSlice from 'modules/deviceType/services/DeviceTypeSlice';
import mainSlice from 'modules/main/services/MainSlice';
import { applicationSphereApi } from 'modules/applicationSphere/servises/ApplicationSphereApi';
import { literatureApi } from 'modules/literature/services/LiteratureApi';
import { producerApi } from 'modules/producer/servises/ProducerApi';
import { environmentApi } from 'modules/environment/services/EnvironmentApi';
import { manufacturingTechnologyApi } from 'modules/manufacturingTechnology/services/ManufacturingTechnologyApi';
import { operationPrincipleApi } from 'modules/operationPrinciple/services/OperationPrincipleApi';
import { sensitiveElementApi } from 'modules/sensitiveElement/services/SensitiveElementApi';
import { outputSignalApi } from 'modules/outputSignal/services/OutputSignalApi';
import { signalConversationApi } from 'modules/signalConversation/services/SignalConversationApi';
import { purposeApi } from 'modules/purpose/services/PurposeApi';
import { controlTypeApi } from 'modules/controlType/services/ControlTypeApi';
import { deviceTypeApi } from 'modules/deviceType/services/DeviceTypeApi';
import { mainApi } from 'modules/main/services/MainApi';

const rootReducer = combineReducers({
  userReducer,
  applicationSphereSlice,
  literatureSlice,
  producerSlice,
  environmentSlice,
  manufacturingTechnologySlice,
  operationPrincipleSlice,
  sensitiveElementSlice,
  outputSignalSlice,
  signalConversationSlice,
  purposeSlice,
  controlTypeSlice,
  deviceTypeSlice,
  mainSlice,
  [registrationApi.reducerPath]: registrationApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [adminApi.reducerPath]: adminApi.reducer,
  [applicationSphereApi.reducerPath]: applicationSphereApi.reducer,
  [literatureApi.reducerPath]: literatureApi.reducer,
  [producerApi.reducerPath]: producerApi.reducer,
  [environmentApi.reducerPath]: environmentApi.reducer,
  [manufacturingTechnologyApi.reducerPath]: manufacturingTechnologyApi.reducer,
  [operationPrincipleApi.reducerPath]: operationPrincipleApi.reducer,
  [sensitiveElementApi.reducerPath]: sensitiveElementApi.reducer,
  [outputSignalApi.reducerPath]: outputSignalApi.reducer,
  [signalConversationApi.reducerPath]: signalConversationApi.reducer,
  [purposeApi.reducerPath]: purposeApi.reducer,
  [controlTypeApi.reducerPath]: controlTypeApi.reducer,
  [deviceTypeApi.reducerPath]: deviceTypeApi.reducer,
  [mainApi.reducerPath]: mainApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        registrationApi.middleware,
        authApi.middleware,
        adminApi.middleware,
        applicationSphereApi.middleware,
      ),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
