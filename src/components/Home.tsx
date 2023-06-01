import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useRef, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import axios, {AxiosResponse} from 'axios';

import useCurrentLocationHook from '../hooks/currentPositionHooks';

const Home = ({
  navigation,
}: NativeStackScreenProps<
  {
    Home: undefined;
    BookMark: undefined;
    Detail: any;
  },
  'Home',
  'BookMark'
>) => {
  const {latitude, longitude, getCurrentPosition} = useCurrentLocationHook();
  const [stationList, setStationList] = useState([]);
  const map = useRef<MapView>(null);

  const nearbyStation = async () => {
    try {
      const data = await axios.get(
        `https://scalar-tc.jp.ngrok.io/stations/nearest/?latitude=${latitude}&longitude=${longitude}&zoom=50`,
      );
      if (data.status === 200) {
        setStationList(data.data);
      } else {
        console.log('failed fetching data');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('BookMark');
        }}>
        <Text>Go to BookMark</Text>
      </TouchableOpacity>

      {latitude && longitude > 1 ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{
            position: 'absolute',
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
          initialRegion={{
            latitude: latitude ? latitude : 0,
            longitude: longitude ? longitude : 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          ref={map}>
          {stationList.map((item: any) => (
            <Marker
              coordinate={{
                longitude: item.location.longitude,
                latitude: item.location.latitude,
              }}
              key={item.id}
              onPress={e => {
                map.current?.animateCamera(
                  {
                    center: {
                      latitude: e.nativeEvent.coordinate.latitude,
                      longitude: e.nativeEvent.coordinate.longitude,
                    },
                  },
                  {duration: 100},
                );
                navigation.navigate('Detail', {
                  location: item.address,
                  id: item.id,
                  name: item.name,
                });
              }}
            />
          ))}
          <Marker
            coordinate={{
              latitude: latitude ? latitude : 0,
              longitude: longitude ? longitude : 0,
            }}
            title="current location"
            description="here is where you are on a map"
          />
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              bottom: 280,
              right: 20,
              width: 50,
              height: 50,
              backgroundColor: '#c4c4c4',
              borderRadius: 20,
            }}
            onPress={() => {
              nearbyStation();
              map.current?.animateCamera(
                {
                  zoom: 10,
                },
                {duration: 100},
              );
            }}>
            <Text
              style={{
                padding: 2,
                fontSize: 12,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              충전기찾기
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              bottom: 200,
              right: 20,
              width: 50,
              height: 50,
              backgroundColor: 'black',
              borderRadius: 20,
            }}
            onPress={() => {
              getCurrentPosition();
              map.current?.animateCamera(
                {
                  center: {
                    longitude,
                    latitude,
                  },
                  zoom: 16,
                },
                {duration: 100},
              );
            }}>
            <Text
              style={{
                padding: 2,
                fontSize: 12,
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
              }}>
              현위치
            </Text>
          </TouchableOpacity>
        </MapView>
      ) : (
        <Text>no location</Text>
      )}
    </View>
  );
};

export default Home;
