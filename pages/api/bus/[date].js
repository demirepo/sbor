import busController from '../../../controllers/bus.controller';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    let { date } = req.query;

    console.log(date);

    try {
      let query = await busController.getBusIdByDate(date);

      if (query) {
        res.status(200).json(query);
      } else {
        res.status(500);
      }
    } catch (error) {
      res.status(500).json('Ошибка доступа к базе данных', error.message);
    }
  }

  if (req.method === 'POST') {
    // let { date } = req.query;
    // console.log({ date });
    // try {
    //     let query = await busController.schedule({ date, type });
    //     if (query.ok) {
    //         res.status(200).json(query);
    //     }
    // } catch (error) {
    //     res.status(500).json('Ошибка доступа к базе данных', error.message);
    // }
  }

  if (req.method === 'PUT') {
  }

  if (req.method === 'DELETE') {
  }
}
