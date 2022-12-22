import React from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import pool from '../model/db';
import SelectWithLabel from './../components/SelectWithLabel';

export default function Home({ tours }) {
  const [ToursAndHotels, setToursAndHotels] = React.useState({});
  const [disableHotelSelect, setDisableHotelSelect] = React.useState(true);
  const [disableRoomInput, setDisableRoomInput] = React.useState(true);

  const onTourSelect = (selected) => {
    setDisableRoomInput(selected === 0 ? true : false);
    setDisableHotelSelect(selected === 0 ? true : false);
  };

  return (
    <>
      <Head>
        <title>Время выезда на экскурсии</title>
        <meta
          name='viewport'
          content='initial-scale=1.0, width=device-width'
        />
      </Head>

      <div className='container'>
        <div className='inner'>
          <form
            className='form stack'
            action=''
          >
            <SelectWithLabel
              label='Выберите экскурсию из списка'
              name='tour'
              placeholder='Название экскурсии'
              optionsList={tours}
              onSelect={onTourSelect}
            />
            <SelectWithLabel
              label='Название отеля'
              name='hotel'
              placeholder='Ваш отель'
              optionsList={['Cosy Beach']}
              disabled={disableHotelSelect}
            />

            <label htmlFor='room'>Номер комнаты</label>
            <input
              type='text'
              name='room'
              id='room'
              placeholder='Tолько цифры'
              inputMode='numeric'
              autoComplete='off'
              disabled={disableRoomInput}
              pattern='\d*'
            />

            <button type='submit'>Проверить</button>
          </form>
        </div>
      </div>

      <style jsx>{`
        .container {
          padding-inline: var(--container-padding-sm);
          display: flex;
          flex-direction: column;
        }

        .inner {
          min-height: 100vh;
          display: grid;
          place-items: center;
        }

        .form {
          padding: 1rem;
          background-color: white;
          width: minmax(200px, 100%);
        }

        .form > * {
          min-width: 0;
        }

        label:nth-of-type(2),
        button[type='submit'] {
          --space: 2rem;
        }

        input {
          padding-inline: 0.2rem;
        }

        input::placeholder {
          opacity: 0.7;
        }

        select,
        input {
          --space: 0.5rem;
        }

        select {
          -webkit-appearance: button;
          -moz-appearance: button;
          -webkit-user-select: none;
          -moz-user-select: none;
          -webkit-padding-end: 20px;
          -moz-padding-end: 20px;
          -webkit-padding-start: 2px;
          -moz-padding-start: 2px;
          background-color: #f07575; /* Fallback color if gradients are not supported */
          background-image: url(../images/select-arrow.png), -webkit-linear-gradient(top, #e5e5e5, #f4f4f4); /* For Chrome and Safari */
          background-image: url(../images/select-arrow.png), -moz-linear-gradient(top, #e5e5e5, #f4f4f4); /* For old Firefox (3.6 to 15) */
          background-image: url(../images/select-arrow.png), -ms-linear-gradient(top, #e5e5e5, #f4f4f4); /* For pre-releases of Internet Explorer  10*/
          background-image: url(../images/select-arrow.png), -o-linear-gradient(top, #e5e5e5, #f4f4f4); /* For old Opera (11.1 to 12.0) */
          background-image: url(../images/select-arrow.png), linear-gradient(to bottom, #e5e5e5, #f4f4f4); /* Standard syntax; must be last */
          background-position: center right;
          background-repeat: no-repeat;
          border: 1px solid #aaa;
          border-radius: 2px;
          box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
          color: #555;
          font-size: inherit;
          margin: 0;
          overflow: hidden;
          padding-top: 2px;
          padding-bottom: 2px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      `}</style>
    </>
  );
}

export const getStaticProps = async () => {
  let tours = null;
  try {
    const query = await pool.query('SELECT tour_name, sell_price from tours');
    if (query) {
      tours = query.rows.map((entry) => `${entry.tour_name} (${entry.sell_price})`);
    }
  } catch (error) {
    console.log('Ошибка получения данных из БД:', error.message);
  }
  return {
    props: { tours },
    revalidate: 1000,
  };
};
