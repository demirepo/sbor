import pool from '../model/db';
import { Hotel } from '../types';

class HotelsController {
  async getIdByFullName(hotel: string) {
    try {
      let query = await pool.query('SELECT id FROM hotels WHERE LOWER(hotel_title) = LOWER($1)', [hotel]);
      const id = query?.rows[0]?.id;
      return id ? { ok: true, id } : { ok: true, id: -1 };
    } catch (error) {
      throw new Error('Ошибка доступа к базе данных');
    }
  }

  async getFullNameByPart(part: string) {
    try {
      let query = await pool.query('SELECT id, hotel_title FROM hotels WHERE LOWER(hotel_title) LIKE LOWER($1)', [
        `%${part}%`,
      ]);

      let entries = query?.rowCount;

      return entries
        ? {
            ok: true,
            message: `Найдено записей: ${entries} по совпадению с ${part}`,
            entries: query.rows,
          }
        : { ok: false, message: `Совпадений c '${part}' не найдено` };
    } catch (error) {
      throw new Error('Ошибка доступа к базе данных');
    }
  }

  async addOneUnique(hotel: Hotel) {
    try {
      let query = await pool.query('SELECT id FROM hotels WHERE LOWER(hotel_title) = LOWER($1)', [hotel]);
      if (query.rowCount > 0) {
        return {
          ok: false,
          message: `Отель с именем '${hotel.title}' уже существует в базе`,
        };
      } else {
        let query = await pool.query('INSERT INTO hotels (hotel_title) VALUES ($1)', [hotel]);

        return query.rowCount !== 0
          ? { ok: true, message: `Отель '${hotel}' успешно добавлен` }
          : { ok: false, message: `Ошибка при добавлении нового отеля` };
      }
    } catch (error) {
      throw new Error('Ошибка доступа к базе данных');
    }
  }

  async addMany(hotels: Hotel[]) {
    try {
      let promises = hotels.map((hotel) => {
        return this.addOneUnique(hotel);
      });
      return Promise.allSettled(promises);
    } catch (error) {
      throw new Error('Ошибка доступа к базе данных');
    }
  }

  async removeById(idArray: number[]) {
    try {
      let query = await pool.query(`DELETE FROM hotels WHERE id IN (${idArray.toString()})`);

      return query.rowCount !== 0
        ? { ok: true, message: `Успешное удаление id: '${idArray}'` }
        : {
            ok: false,
            message: `Ошибка удаления: отель с запрошенным id не найден`,
          };
    } catch (error) {
      throw new Error('Ошибка доступа к базе данных');
    }
  }

  async importFromJson(json: Hotel[]) {
    console.log(json);
  }
}

export default new HotelsController();
