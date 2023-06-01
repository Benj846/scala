import {create} from 'zustand';

interface AccessTokenState {
  accessToken: string;
  setAccessToken: (token: string) => void;
}
interface RefreshTokenState {
  refreshToken: string;
  setRefreshToken: (token: string) => void;
}
interface CurrentLocationState {
  latitude: number;
  longitude: number;
  setCurrentLocation: (location: {latitude: number; longitude: number}) => void;
}
export const useAccessTokenStore = create<AccessTokenState>()(set => ({
  accessToken: '',
  setAccessToken: token => set(state => ({accessToken: token})),
}));

export const useRefreshTokenStore = create<RefreshTokenState>()(set => ({
  refreshToken: '',
  setRefreshToken: token => set(state => ({refreshToken: token})),
}));

export const useCurrentLocationStore = create<CurrentLocationState>()(set => ({
  latitude: 0,
  longitude: 0,
  setCurrentLocation: ({latitude, longitude}) =>
    set(state => ({
      latitude,
      longitude,
    })),
}));

export default useAccessTokenStore;
