import React, { useState, useRef } from 'react';
import { FlatList, ViewToken } from 'react-native';

import Bullet from '../../components/Bullet';

import * as S from './styles';

interface Props {
  imagesUrl: {
    id: string;
    photo: string;
  }[];
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export default function ImageSlider({ imagesUrl }: Props) {
  const [imageIndex, setImageIndex] = useState(0);

  const indexChange = useRef((info: ChangeImageProps) => {
    setImageIndex(info.viewableItems[0].index!);
  });

  return (
   <S.Container>
     <S.ImageIndexes>
       {
         imagesUrl.map((item, index) => (
           <Bullet
            key={String(item.id)}
            active={index === imageIndex} 
           />
         ))
       }
     </S.ImageIndexes>

      <FlatList 
          data={imagesUrl}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
          <S.CarImageWrapper>
            <S.CarImage 
              source={{ uri: item.photo }}
              resizeMode='contain'
            />
          </S.CarImageWrapper>       
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={indexChange.current}
      />
   </S.Container>
  );
}