import React from 'react';

import GasolineIcon from '../../assets/gasoline.svg';

import * as S from './styles';

export interface CarData {
  id: string;
  brand: string;
  name: string;
  rent: {
    period: string;
    price: number;
  };
  thumbnail: string;
}

interface Props {
  data: CarData;
}

export default function Car({ data }: Props) {
 return (
   <S.Container>
     <S.Details>
       <S.Brand>{data.brand}</S.Brand>
       <S.Name>{data.name}</S.Name>

       <S.About>
         <S.Rent>
           <S.Period>{data.rent.period}</S.Period>
           <S.Price>{`R$ ${data.rent.price}`}</S.Price>
         </S.Rent>

         <S.Type>
           <GasolineIcon />
         </S.Type>
       </S.About>
     </S.Details>

     <S.CarImage 
      source={{ uri: data.thumbnail }}
      resizeMode="contain"
     />
   </S.Container>
  );
}