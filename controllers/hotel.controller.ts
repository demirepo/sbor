import pool from '../model/db';
import { Hotel, HotelDB } from '../types';

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

  async getHotelByNamePart(part: string) {
    try {
      let query = await pool.query(
        'SELECT id, hotel_title, latitude,longitude, comment, google_name, iframe FROM hotels WHERE LOWER(hotel_title) LIKE LOWER($1)',
        [`%${part}%`]
      );

      let { rowCount } = query;
      const data = query.rows.map((el: HotelDB) => ({
        id: el.id,
        title: el.hotel_title,
        latitude: el.latitude,
        longitude: el.longitude,
        comment: el.comment,
        googleName: el.google_name,
        iframe: el.iframe,
      }));

      return rowCount > 0
        ? {
            ok: true,
            message: `Найдено записей: ${rowCount} по совпадению с ${part}`,
            data,
          }
        : { ok: false, message: `Совпадений c '${part}' не найдено` };
    } catch (error) {
      throw new Error('Ошибка доступа к базе данных');
    }
  }

  async getHotelById(id: string) {
    try {
      let query = await pool.query('SELECT * FROM hotels WHERE id = $1', [id]);

      let entries = query?.rowCount;

      return entries
        ? {
            ok: true,
            message: `Запись с id=${id} найдена`,
            data: query.rows[0][0],
          }
        : { ok: false, message: `Записей c id='${id}' не найдено` };
    } catch (error) {
      throw new Error('Ошибка доступа к базе данных');
    }
  }

  async addOneUnique(hotel: Hotel) {
    try {
      let query = await pool.query('SELECT id FROM hotels WHERE LOWER(hotel_title) = LOWER($1)', [hotel.title]);
      if (query.rowCount > 0) {
        return {
          ok: false,
          message: `Отель с именем '${hotel.title}' уже существует в базе`,
        };
      } else {
        let query = await pool.query(
          'INSERT INTO hotels (hotel_title, google_name, latitude, longitude, iframe,comment) VALUES ($1,$2,$3,$4,$5,$6)',
          [hotel.title, hotel.googleName, hotel.latitude, hotel.longitude, hotel.iframe, hotel.comment]
        );

        return query.rowCount !== 0
          ? { ok: true, message: `Отель '${hotel.title}' успешно добавлен` }
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

  async updateHotel(hotel: Hotel) {
    try {
      const { id } = hotel;

      let query = await pool.query(
        `UPDATE hotels SET(hotel_title,latitude,longitude,comment,google_name,iframe)=($1,$2,$3,$4,$5,$6) WHERE id=$7`,
        [hotel.title, hotel.latitude, hotel.longitude, hotel.comment, hotel.googleName, hotel.iframe, id]
      );

      return query.rowCount !== 0
        ? { ok: true, message: `Элемент с id='${id}' успешно обновлен` }
        : {
            ok: false,
            message: `Элемент с id='${id}' обновить не получилось`,
          };
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
