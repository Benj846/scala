import {View, Text, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';

const Home = ({
  navigation,
}: NativeStackScreenProps<
  {Home: undefined; BookMark: undefined},
  'Home',
  'BookMark'
>) => {
  return (
    <View>
      <Text>Home</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('BookMark');
        }}>
        <Text>Go to BookMark</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
