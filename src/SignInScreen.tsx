import React from 'react';
import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { withFirebaseHOC, IFirebase } from './firebase';

interface Props {
  firebase: IFirebase;
}

export const SignInScreen: React.FC<Props> = props => {
  const { firebase } = props;
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View>
      <TextInput placeholder="Email Address" testID="username-input" value={username} onChangeText={setUsername} />
      <TextInput placeholder="Password" testID="password-input" value={password} onChangeText={setPassword} secureTextEntry />
      <Button testID="signup-button" onPress={() => firebase.signupWithEmail(username, password)}>
        Sign Up
      </Button>
      <Button testID="login-button" onPress={() => firebase.loginWithEmail(username, password)}>
        Sign In
      </Button>
    </View>
  );
};

export default withFirebaseHOC(SignInScreen);
