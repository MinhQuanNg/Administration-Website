import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice'
import dossierReducer from './features/dossier/dossierSlice'
import { authApi } from './services/auth/authService'
import { dataApi } from './services/data/dataService'
import { settingsApi } from './services/data/settingsService'

const store = configureStore({
  reducer: {
    auth: authReducer,
    dossier: dossierReducer,
    [authApi.reducerPath]: authApi.reducer,
    [dataApi.reducerPath]: dataApi.reducer,
    [settingsApi.reducerPath]: settingsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware).concat(dataApi.middleware),
})
export default store