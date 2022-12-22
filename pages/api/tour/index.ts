import { NextApiRequest, NextApiResponse } from 'next';
import tourController from '../../../controllers/tour.controller';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      let request = await tourController.getAllTours();

      if (request.ok) {
        res.status(200).json(request);
      }
    } catch (error: any) {
      res.status(500).json(`Ошибка доступа к базе данных: ${error.message}`);
    }
  }

  if (req.method === 'POST') {
  }

  if (req.method === 'PUT') {
  }

  if (req.method === 'DELETE') {
  }
}
