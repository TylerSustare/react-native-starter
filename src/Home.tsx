import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './SignInScreen';
import Welcome from './Welcome';
import { NavigationContainer } from '@react-navigation/native';
import { withFirebaseHOC, IFirebase } from './firebase';

const Stack = createStackNavigator();

interface Props {
  firebase: IFirebase;
}

const App: React.FC<Props> = ({ firebase }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    let unsubscribe;
    const getUser = async () => {
      unsubscribe = await firebase.checkUserAuth(user => setUser(user));
    };
    getUser();
    return function cleanup() {
      unsubscribe();
    };
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user == null ? (
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{
              title: 'Sign in',
              headerStyle: {
                backgroundColor: '#59bfff'
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold'
              }
            }}
          />
        ) : (
          <Stack.Screen name="Welcome" component={Welcome} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default withFirebaseHOC(App);
