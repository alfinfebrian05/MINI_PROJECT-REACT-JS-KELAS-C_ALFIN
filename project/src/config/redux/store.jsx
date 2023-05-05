import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['agentProperty', 'ownerProperty']
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunkMiddleware]
});

export const persist_store = persistStore(store);
export default store;
