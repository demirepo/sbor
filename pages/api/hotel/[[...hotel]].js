import hotelsController from '../../../controllers/hotel.controller';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    let { hotel } = req.query;

    try {
      let query = await hotelsController.getFullNameByPart(hotel);

      if (query.ok) {
        res.status(200).json(query);
      } else {
        res.status(200).json(query);
      }
    } catch (error) {
      res.status(500).json('Ошибка доступа к базе данных', error.message);
    }
  }

  if (req.method === 'POST') {
    let hotels = req.body;

    if (!hotels || hotels.length === 0) {
      res.status(400).json('Не предоставлены данные отеля (отелей)');
    } else {
      const response = await hotelsController.addMany(hotels);
      res.status(200).json(response);
    }
  }

  if (req.method === 'PUT') {
  }

  if (req.method === 'DELETE') {
    const idArray = req.query.hotel;

    if (Array.isArray(idArray)) {
      for (let item of idArray) {
        if (isNaN(item)) {
          res.status(400).json({ ok: false, message: 'Id должен быть числом' });
        }
      }
    }

    try {
      const response = await hotelsController.removeById(idArray);
      if (response.ok) {
        res.status(200).json(response);
      } else {
        res.status(404).json(response);
      }
    } catch (error) {
      res.status(500).json('Ошибка доступа к базе данных: ', error.message);
    }
  }
}
