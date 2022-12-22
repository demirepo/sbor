import pool from '../model/db';

interface ScheduleParams {
  departure: Date;
  type: 'bigbus' | 'minibus' | 'individual';
  tourId: number;
}

interface ControllerResponse<T> {
  ok: boolean;
  message: string;
  data?: T;
}

class BusController {
  async schedule({ departure, type, tourId }: ScheduleParams): Promise<ControllerResponse<any>> {
    try {
      let query = await pool.query('INSERT INTO buses(departure, type, tour_id) VALUES($1,$2,$3)', [
        departure,
        type,
        tourId,
      ]);
      const rowCount = query?.rowCount;
      return rowCount
        ? {
            ok: true,
            message: `Автобус типа "${type}" запланирован на экскурсию с id "${tourId}" на ${departure} `,
          }
        : { ok: false, message: 'Добавить автобус в БД не удалось' };
    } catch (error) {
      throw new Error('Ошибка доступа к базе данных');
    }
  }

  async getBusIdByDate(date: Date) {
    try {
      let query = await pool.query('SELECT type, tour_id FROM buses WHERE departure = $1', [date]);
      const rowCount = query?.rowCount;

      return rowCount
        ? {
            ok: true,
            message: `На запланированную дату найдено ${rowCount} автобусов`,
            data: query.rows,
          }
        : { ok: false, message: `На дату ${date} автобусов не запланировано` };
    } catch (error) {
      throw new Error('Ошибка доступа к базе данных');
    }
  }
}

export default new BusController();
