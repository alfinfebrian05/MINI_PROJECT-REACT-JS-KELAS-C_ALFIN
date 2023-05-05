import * as React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloProvider } from '@apollo/client';
import store, { persist_store } from './config/redux/store';
import clientApollo from './config/apollo';
import 'flowbite';

import RootRouter from './components/RootRouter';

function App() {
  return (
    <ApolloProvider client={clientApollo}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persist_store}>
          <div className="App">
            <RootRouter />
          </div>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
