import {create} from 'zustand';

interface AccessTokenState {
  accessToken: string;
  setAccessToken: (token: string) => void;
}
interface RefreshTokenState {
  refreshToken: string;
  setRefreshToken: (token: string) => void;
}
export const useAccessTokenStore = create<AccessTokenState>()(set => ({
  accessToken: '',
  setAccessToken: token => set(state => ({accessToken: token})),
}));

export const useRefreshTokenStore = create<RefreshTokenState>()(set => ({
  refreshToken: '',
  setRefreshToken: token => set(state => ({refreshToken: token})),
}));

export default useAccessTokenStore;
