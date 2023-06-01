import axios from 'axios';
import {useState} from 'react';
import {useAccessTokenStore, useRefreshTokenStore} from '../store/store';

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();
  const [success, setSuccess] = useState(false);

  const signup = async (username: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const url = 'https://scalar-tc.jp.ngrok.io/auth/signup/email';
      const body = {username, email, password};

      const response = await axios.post(url, body);

      if (response.status === 200) {
        setSuccess(true);
      } else {
        setError('Signup failed. Please try again.');
        console.log('signup failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
      console.log('error occurred');
    }

    setLoading(false);
  };

  return {
    loading,
    error,
    success,
    signup,
  };
};

const useSignin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();
  const [success, setSuccess] = useState(false);
  const {accessToken, setAccessToken} = useAccessTokenStore();
  const {refreshToken, setRefreshToken} = useRefreshTokenStore();

  const signin = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const url = 'https://scalar-tc.jp.ngrok.io/auth/signin';
      const body = {email, password};

      const response = await axios.post(url, body);

      if (response.status === 200) {
        setSuccess(true);

        const access_token: string = response.data.access_token;
        const refresh_token: string = response.data.refresh_token;

        // store token in asyncStorage with zustand
        setAccessToken(access_token);
        setRefreshToken(refresh_token);
        console.log(accessToken);

        // navigate to home screen
      } else {
        setError('Signin failed. Please try again.');
        console.log('signin failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
      console.log('error occurred');
    }
    setLoading(false);
  };

  return {loading, error, success, signin};
};

export default useSignup;
export {useSignin, useSignup};
