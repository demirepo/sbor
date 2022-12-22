import { Pool } from 'pg';

// {
//   user: '',
//   password: '',
//   host: '',
//   post: ,
//   database: '',
// }
// вся конфигурация по умолчанию в .env

let pool;

if (!pool) {
  pool = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT) || 5432,
    database: process.env.PGDATABASE,
  });
}

pool.on('connect', () => {
  console.log('Установлено соединение с БД');
});

pool.on('error', (err, client) => {
  console.error('Ошибка соединения с БД:', err);
});

export default pool as InstanceType<typeof Pool>;
