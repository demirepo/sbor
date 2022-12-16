import { Pool } from "pg";

// {
//   user: '',
//   password: '',
//   host: '',
//   post: ,
//   database: '',
// }
// вся конфигурация по умолчанию в .env

let connection;

if (!connection) {
  connection = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT) || 5432,
    database: process.env.PGDATABASE,
  });
}

connection.on("connect", () => {
  console.log("Установлено соединение с БД");
});

export default connection;
