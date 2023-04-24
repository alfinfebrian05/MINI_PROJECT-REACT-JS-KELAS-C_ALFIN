import * as React from 'react';
import { ApolloProvider } from '@apollo/client';
import clientApollo from './config/apollo';
import 'flowbite';

import RootRouter from './components/RootRouter';

function App() {
  return (
    <ApolloProvider client={clientApollo}>
      <div className="App">
        <RootRouter />
      </div>
    </ApolloProvider>
  );
}

export default App;
