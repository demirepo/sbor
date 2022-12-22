import { BusType } from '../types';

export const busType = (type: BusType): string => {
  let busType = 'неизвестен';
  switch (type) {
    case 'bigbus':
      busType = 'Большой автобус';
      break;
    case 'minibus':
      busType = 'Микроавтобус';
      break;
  }
  return busType;
};
