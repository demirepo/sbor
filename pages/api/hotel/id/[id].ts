import hotelController from '../../../../controllers/hotel.controller';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    let { id } = req.query;

    try {
      let query = await hotelController.getHotelById(id as any);

      if (query.ok) {
        res.status(200).json(query);
      } else {
        res.status(200).json(query);
      }
    } catch (error: any) {
      res.status(500).json(`Ошибка доступа к базе данных: ${error.message}`);
    }
  }
}
