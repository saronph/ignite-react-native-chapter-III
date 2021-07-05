import React, { useState, useRef } from 'react';
import { FlatList, ViewToken } from 'react-native';

import * as S from './styles';

interface Props {
  imagesUrl: string[];
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
         imagesUrl.map((_, index) => (
           <S.ImageIndex 
            key={String(index)}
            active={index === imageIndex} 
           />
         ))
       }
     </S.ImageIndexes>

      <FlatList 
          data={imagesUrl}
          keyExtractor={key => key}
          renderItem={({ item }) => (
          <S.CarImageWrapper>
            <S.CarImage 
              source={{ uri: item }}
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