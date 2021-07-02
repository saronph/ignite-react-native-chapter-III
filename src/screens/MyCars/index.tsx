import React, { useEffect, useState } from 'react';
import CarDTO from '../../dtos/CarDTO';

import api from '../../services/api';

import * as S from './styles';

export default function MyCars() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/schedules_byuser?user_id=1');
        console.log(response);
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCars()
  }, [])

  return (
    <S.Container>
      <S.Title>MyCars</S.Title>
    </S.Container>
  );
}