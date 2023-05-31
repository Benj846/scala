import {View, Text, TextInput} from 'react-native';
import useBearStore from '../store/store';

import React from 'react';

const MyPage = () => {
  const {bears} = useBearStore();
  return (
    <View>
      <TextInput
        value="test"
        style={{
          width: 200,
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
        }}
      />

      <TextInput />
      <Text>MyPage</Text>
      <Text>{bears}</Text>
    </View>
  );
};

export default MyPage;
