import React from 'react';

import * as S from './styles';

interface Props {
  imageURL: string[];
}

export default function ImageSlider({ imageURL }: Props) {
  return (
   <S.Container>
     <S.ImageIndexes>
      <S.ImageIndex active={true} />
      <S.ImageIndex active={false} />
      <S.ImageIndex active={false} />
      <S.ImageIndex active={false} />
     </S.ImageIndexes>

     <S.CarImageWrapper>
       <S.CarImage 
          source={{ uri: imageURL[0] }}
          resizeMode='contain'
       />
     </S.CarImageWrapper>
   </S.Container>
  );
}