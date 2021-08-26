import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import Animated, { 
  useSharedValue, 
  useAnimatedScrollHandler, 
  useAnimatedStyle,
  interpolate,
  Extrapolate,  
} from 'react-native-reanimated';

import Accessory from '../../components/Accessory';
import BackButton from '../../components/BackButton';
import ImageSlider from '../../components/ImageSlider';
import Button from '../../components/Button';
import { Car as ModelCar } from '../../database/model/Car';
import CarDTO from '../../dtos/CarDTO';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useTheme } from 'styled-components';

import * as S from './styles';
import api from '../../services/api';
import { useNetInfo } from '@react-native-community/netinfo';

interface Params {
  car: ModelCar;
}

export default function CarDetails() {
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);

  const netInfo = useNetInfo();
  const navigation = useNavigation();
  const route = useRoute();
  const { car } = route.params as Params;

  const theme = useTheme();

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      )
    }
  })

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, 150],
        [1, 0]
      )
    }
  })

  function handleConfirmRental() {
    navigation.navigate('Scheduling', {
      car
    });
  }

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    async function fetchCarUpdated() {
      const response = await api.get(`/cars/${car.id}`);
      setCarUpdated(response.data);
    }

    if (netInfo.isConnected === true) {
      fetchCarUpdated();
    }
  }, [netInfo.isConnected])
  
  return (
    <S.Container>
      <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent />

      <Animated.View style={[
        headerStyleAnimation, 
        style.header,
        { backgroundColor: theme.colors.background_secondary }
        ]}>
        <S.Header>
          <BackButton onPress={handleBack} />
        </S.Header>

        <Animated.View style={sliderCarsStyleAnimation}>
          <S.CarImages>
            <ImageSlider imagesUrl={
              !!carUpdated.photos ?
              carUpdated.photos : [{ id: car.thumbnail, photo: car.thumbnail }]
              }/>
          </S.CarImages>
        </Animated.View>
      </Animated.View>


      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + 160,
          alignItems: 'center'
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <S.Details>
          <S.Description>
            <S.Brand>{car.brand}</S.Brand>
            <S.Name>{car.name}</S.Name>
          </S.Description>

          <S.Rent>
            <S.Period>{car.period}</S.Period>
            <S.Price>R$ {netInfo.isConnected === true ? car.price : '...'}</S.Price>
          </S.Rent>
        </S.Details>

      {
        carUpdated.accessories &&
        <S.Accessories>
          {       
            carUpdated.accessories.map(accessory => (
              <Accessory 
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)} 
              />
            ))
          }
        </S.Accessories>
      }

        <S.About>
          {car.about}
        </S.About>
      </Animated.ScrollView>

      <S.Footer>
        <Button 
          title="Escolher período do aluguel" 
          onPress={handleConfirmRental}
          enabled={netInfo.isConnected === true}
        />

        {
          netInfo.isConnected === false &&
          <S.OfflineInfo>
            Se conecte á internet para poder ver mais detalhes e alugar seu carro.
          </S.OfflineInfo>
        }
      </S.Footer>
    </S.Container>
  );
}

const style = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1,
  }
})