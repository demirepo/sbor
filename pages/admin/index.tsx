import React from 'react';
import WithSidebar from '../../layout/WithSidebar';
import Sidebar from '../../layout/Sidebar';
import { GetStaticProps } from 'next';
import pool from '../../model/db';

export default function Admin() {
  const [currentDate, setCurrentDate] = React.useState<Date>(() => new Date());

  return (
    <WithSidebar
      currentDate={currentDate}
      sidebar={
        <Sidebar
          date={currentDate}
          setDate={setCurrentDate}
        />
      }
    />
  );
}

export const getStaticProps: GetStaticProps = async () => {
  let tours = null;
  try {
    const query = await pool.query('SELECT id, tour_name FROM tours');
    if (query) {
      tours = query.rows.map((el) => ({
        id: el.id,
        tourName: el.tour_name || '',
      }));
    }
  } catch (error: any) {
    console.log('Ошибка получения данных из БД:', error.message);
  }
  return {
    props: { tours },
    revalidate: 10,
  };
};
