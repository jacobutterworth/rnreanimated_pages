import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
// import Box from '../components/Box';
import Spacer from '../components/Spacer';

interface Props {
  navigation: NavigationProp<any>;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Spacer>
        <Button
          title="Anim 1"
          onPress={() => {
            navigation.navigate('Ball', {});
          }}
        />
      </Spacer>
      <Spacer>
        <Button
          title="Anim 2"
          onPress={() => {
            navigation.navigate('Box', {});
          }}
        />
      </Spacer>
      <Spacer>
        <Button
          title="Anim 3"
          onPress={() => {
            navigation.navigate('FidgetBox', {});
          }}
        />
      </Spacer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
