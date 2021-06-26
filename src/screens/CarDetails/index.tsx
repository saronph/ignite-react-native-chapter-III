import React from 'react';

import Accessory from '../../components/Accessory';
import BackButton from '../../components/BackButton';
import ImageSlider from '../../components/ImageSlider';
import Button from '../../components/Button';

import SpeedSvg from '../../assets/speed.svg';
import AccelerationSvg from '../../assets/acceleration.svg';
import ForceSvg from '../../assets/force.svg';
import GasolineSvg from '../../assets/gasoline.svg';
import ExchangeSvg from '../../assets/exchange.svg';
import PeopleSvg from '../../assets/people.svg';

import * as S from './styles';

export default function CarDetails() {
 return (
   <S.Container>
     <S.Header>
       <BackButton onPress={() => {}}/>
     </S.Header>

     <S.CarImages>
      <ImageSlider imageURL={[
        'https://production.autoforce.com/uploads/version/profile_image/3188/model_main_comprar-tiptronic_87272c1ff1.png']}/>
     </S.CarImages>

     <S.Content>
       <S.Details>
         <S.Description>
           <S.Brand>Lamborghini</S.Brand>
           <S.Name>Huracan</S.Name>
         </S.Description>

         <S.Rent>
           <S.Period>Ao dia</S.Period>
           <S.Price>R$ 500,00</S.Price>
         </S.Rent>
       </S.Details>

       <S.Accessories>
          <Accessory name="380Km/h" icon={SpeedSvg} />
          <Accessory name="3.2s" icon={AccelerationSvg} />
          <Accessory name="800 HP" icon={ForceSvg} />
          <Accessory name="Gasolina" icon={GasolineSvg} />
          <Accessory name="Auto" icon={ExchangeSvg} />
          <Accessory name="2 Pessoas" icon={PeopleSvg} />
       </S.Accessories>

       <S.About>
         Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore voluptatum incidunt excepturi expedita laboriosam error dolore aliquam facilis unde beatae! Nisi unde modi odit nam quos nostrum ea sed nemo!
       </S.About>
     </S.Content>

     <S.Footer>
       <Button title="Confirmar"  />
     </S.Footer>
   </S.Container>
  );
}