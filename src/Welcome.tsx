import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { withFirebaseHOC, IFirebase } from './firebase';
import { Button } from 'react-native-paper';

interface Props {
  firebase: IFirebase;
}

const Welcome: React.FC<Props> = ({ firebase }) => {
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
    <View>
      <Text>Welcome {user?.email}</Text>
      <Button onPress={() => firebase.signOut()}> signout </Button>
    </View>
  );
};

export default withFirebaseHOC(Welcome);
