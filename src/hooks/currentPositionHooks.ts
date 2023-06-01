import {useEffect} from 'react';
import {useCurrentLocationStore} from './../store/store';
import Geolocation from '@react-native-community/geolocation';
const useCurrentLocationHook = () => {
  const {latitude, longitude, setCurrentLocation} = useCurrentLocationStore();

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(info => {
      const {latitude, longitude} = info.coords;
      setCurrentLocation({
        latitude,
        longitude,
      });
    });
  };
  useEffect(() => {
    getCurrentPosition();
  }, []);

  return {latitude, longitude, getCurrentPosition};
};

export default useCurrentLocationHook;
