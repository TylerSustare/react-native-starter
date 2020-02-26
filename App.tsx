import React from 'react';
import Home from './src/Home';
import Firebase, { FirebaseProvider } from './src/firebase';
import { Provider as PaperProvider } from 'react-native-paper';

export default () => {
  return (
    <FirebaseProvider value={Firebase}>
      <PaperProvider>
        <Home />
      </PaperProvider>
    </FirebaseProvider>
  );
};
