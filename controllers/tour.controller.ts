import pool from '../model/db';
import { ControllerResponse } from '../types';

class TourController {
  async getAllTours(): Promise<ControllerResponse<any>> {
    try {
      let query = await pool.query('SELECT id, tour_name FROM tours');
      const rowCount = query?.rowCount;
      return rowCount
        ? {
            ok: true,
            message: `Найдено ${rowCount} экскурсий`,
            data: query.rows,
          }
        : { ok: false, message: 'Ошибка при получении перечня экскурсий' };
    } catch (error) {
      throw new Error('Ошибка доступа к базе данных');
    }
  }
}

export default new TourController();
