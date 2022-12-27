import hotelController from '../../../controllers/hotel.controller';
import { NextApiRequest, NextApiResponse } from 'next';
import { Hotel } from './../../../types/index';
import { isObject } from './../../../utils/isObject';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    let namePart;

    if (req.query.hotel && Array.isArray(req.query.hotel)) {
      [namePart] = req.query.hotel;
    } else if (typeof req.query.hotel === 'string') {
      namePart = req.query.hotel;
    }

    try {
      let query = await hotelController.getHotelByNamePart(namePart as any);

      if (query.ok) {
        res.status(200).json(query);
      } else {
        res.status(200).json(query);
      }
    } catch (error: any) {
      res.status(500).json(`Ошибка доступа к базе данных: ${error.message}`);
    }
  }

  if (req.method === 'POST') {
    let hotels = JSON.parse(req.body);

    try {
      if (!hotels || hotels.length === 0) {
        res.status(400).json('Не предоставлены данные отеля (отелей)');
      } else {
        const response = await hotelController.addMany(hotels);
        res.status(200).json(response);
      }
    } catch (error: any) {
      res.status(500).json(`Ошибка доступа к базе данных: ${error.message}`);
    }
  }

  if (req.method === 'PUT') {
    const hotelEntry: Hotel = JSON.parse(req.body);

    try {
      if (!isObject(hotelEntry)) {
        res.status(400).json('Не предоставлены данные для сохранения в БД');
      } else {
        const response = await hotelController.updateHotel(hotelEntry);
        res.status(200).json(response);
      }
    } catch (error: any) {
      res.status(500).json(`Ошибка доступа к базе данных: ${error.message}`);
    }
  }

  if (req.method === 'DELETE') {
    const idStringArray = req.query.hotel;
    let idArray: number[] = [];

    if (Array.isArray(idStringArray) && idStringArray.length !== 0) {
      idArray = idStringArray.map((id) => Number(id));
    }

    if (idArray.some((id) => isNaN(id))) {
      res.status(400).json({ ok: false, message: 'Id должен быть числом' });
    }

    try {
      const response = await hotelController.removeById(idArray);
      if (response.ok) {
        res.status(200).json(response);
      } else {
        res.status(404).json(response);
      }
    } catch (error: any) {
      res.status(500).json(`Ошибка доступа к базе данных: ${error.message}`);
    }
  }
}
