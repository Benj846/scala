import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const Home = ({navigation}) => {
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
