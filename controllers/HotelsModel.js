import connection from "../model/db";

class HotelsModel {
  async getIdByFullName(hotel) {
    try {
      let query = await connection.query(
        "SELECT id FROM hotels WHERE LOWER(hotel_name) = LOWER($1)",
        [hotel]
      );
      const id = query?.rows[0]?.id;
      return id ? { ok: true, id } : { ok: true, id: -1 };
    } catch (error) {
      throw new Error("Ошибка доступа к базе данных");
    }
  }

  async getFullNameByPart(part) {
    try {
      let query = await connection.query(
        "SELECT id, hotel_name FROM hotels WHERE LOWER(hotel_name) LIKE LOWER($1)",
        [`%${part}%`]
      );

      let entries = query?.rowCount;

      return entries
        ? {
            ok: true,
            message: `Найдено записей: ${entries} по совпадению с ${part}`,
            entries: query.rows,
          }
        : { ok: false, message: `Совпадений c '${part}' не найдено` };
    } catch (error) {
      throw new Error("Ошибка доступа к базе данных");
    }
  }

  async addOneUnique(hotel) {
    try {
      let query = await connection.query(
        "SELECT id FROM hotels WHERE LOWER(hotel_name) = LOWER($1)",
        [hotel]
      );
      if (query.rowCount > 0) {
        return {
          ok: false,
          message: `Отель с именем '${hotel}' уже существует в базе`,
        };
      } else {
        let query = await connection.query(
          "INSERT INTO hotels (hotel_name) VALUES ($1)",
          [hotel]
        );

        return query.rowCount !== 0
          ? { ok: true, message: `Отель '${hotel}' успешно добавлен` }
          : { ok: false, message: `Ошибка при добавлении нового отеля` };
      }
    } catch (error) {
      throw new Error("Ошибка доступа к базе данных");
    }
  }

  async addMany(hotels) {
    try {
      let promises = hotels.map((hotel) => {
        return this.addOneUnique(hotel);
      });
      return Promise.allSettled(promises);
    } catch (error) {
      throw new Error("Ошибка доступа к базе данных");
    }
  }

  async removeById(idArray) {
    try {
      let query = await connection.query(
        `DELETE FROM hotels WHERE id IN (${idArray.toString()})`
      );

      return query.rowCount !== 0
        ? { ok: true, message: `Успешное удаление id: '${idArray}'` }
        : {
            ok: false,
            message: `Ошибка удаления: отель с запрошенным id не найден`,
          };
    } catch (error) {
      throw new Error("Ошибка доступа к базе данных");
    }
  }
}

export default new HotelsModel();
