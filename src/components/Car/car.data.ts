import { CarData } from './';

let id = 1;

export const CarStaticData: CarData = {
    id: String(id++),
    brand: 'audi',
    name: 'RS 5 Coupé',
    rent: {
      period: 'Ao dia',
      price: 150.00,
    },
    thumbnail: 'https://production.autoforce.com/uploads/version/profile_image/3188/model_main_comprar-tiptronic_87272c1ff1.png'
  }
