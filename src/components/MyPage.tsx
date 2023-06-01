import {
  View,
  TextInput,
  Button,
  Alert,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import useAccessTokenStore from '../store/store';

import React, {useState} from 'react';
import {useSignup, useSignin} from '../hooks/authHooks';

const MyPage = () => {
  const {accessToken} = useAccessTokenStore();
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signup} = useSignup();
  const {signin} = useSignin();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {accessToken ? (
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={50}>
          <TextInput
            placeholder="email"
            style={{
              width: 200,
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              marginBottom: 20,
            }}
            onChangeText={(text: string) => {
              setEmail(text);
            }}
          />
          <TextInput
            placeholder="password"
            style={{
              width: 200,
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              marginBottom: 20,
            }}
            onChangeText={(text: string) => {
              setPassword(text);
            }}
          />
          <Button
            title={'로그인'}
            onPress={() => {
              signin(email, password);
            }}
          />
          <Text>you are logged in</Text>
        </KeyboardAvoidingView>
      ) : (
        <View>
          <TextInput
            placeholder="user name"
            style={{
              width: 200,
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              marginBottom: 20,
            }}
            onChangeText={text => {
              setUsername(text);
            }}
          />

          <TextInput
            placeholder="email"
            style={{
              width: 200,
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              marginBottom: 20,
            }}
            onChangeText={text => {
              setEmail(text);
            }}
          />

          <TextInput
            placeholder="password"
            style={{
              width: 200,
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              marginBottom: 20,
            }}
            onChangeText={text => {
              setPassword(text);
            }}
          />
          <Button
            title={'회원가입'}
            onPress={async () => {
              try {
                await signup(username, email, password);
                await signin(email, password);
              } catch (error: any) {
                Alert.alert('회원가입 실패', error);
              }
            }}
          />
        </View>
      )}
    </View>
  );
};

export default MyPage;
