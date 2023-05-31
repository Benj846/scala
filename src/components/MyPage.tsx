import {
  View,
  Text,
  TextInput,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputTextInputEventData,
  Button,
  Alert,
} from 'react-native';
import useAccessTokenStore from '../store/store';

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useSignup, useSignin} from '../hooks/authHooks';

const MyPage = () => {
  const {accessToken, setAccessToken} = useAccessTokenStore();
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {loading, error, success, signup} = useSignup();
  const {
    loading: signinLoading,
    error: signinError,
    success: signinSuccess,
    signin,
  } = useSignin();

  useEffect(() => {
    console.log('username', username);
  }, [username]);
  const handleSignUpWithAxios = async () => {
    try {
      const resData = await axios.post(
        'https://scalar-tc.jp.ngrok.io/auth/signup/email',
        {
          username: username,
          email: email,
          password: password,
        },
      );
      console.log(resData.data);
    } catch (error) {
      console.log(error);
    }
    // console.log('handleSignUpWithAxios');
    // console.log('username', username);
    // console.log('email', email);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
        title={'로그인'}
        onPress={() => {
          signin(email, password);
        }}
      />
      <Text>MyPage</Text>
      <Text>{accessToken ? 'you are logged in' : 'you are not logged in'}</Text>
    </View>
  );
};

export default MyPage;
