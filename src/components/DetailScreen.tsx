import {View, Text} from 'react-native';
import React from 'react';

const DetailScreen = ({navigation, route}: any) => {
  const {location, id, name} = route.params;

  return (
    <View>
      <Text>{location}</Text>
      <Text>{name}</Text>
    </View>
  );
};

export default DetailScreen;
