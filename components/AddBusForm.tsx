import React, { SyntheticEvent } from 'react';
import { ToursTableRow } from '../types';
import { fetcher } from '../utils/fetcher';
import useSWR from 'swr';
import notation from '../utils/notation';
import Spinner from './Spinner';

export default function AddBusForm() {
  const { data, isLoading } = useSWR('http://localhost:3000/api/tour', fetcher);

  let tours;
  if (data) {
    tours = data.data?.map((el: any) => notation.auto(el));
  }

  const addBus = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <form action=''>
        {isLoading && (
          <div className='loader'>
            <Spinner />
          </div>
        )}
        <fieldset className='stack'>
          <legend>Добавление автобуса</legend>

          <label htmlFor='tour'>Экскурсия</label>
          <select
            name='tour'
            id='tour'
          >
            {tours &&
              tours.map((tour: ToursTableRow) => {
                return <option key={tour.id}>{tour.tourName}</option>;
              })}
          </select>
          <div className='row'>
            <input
              type={'radio'}
              name='type'
              id='big'
              value={'big'}
            ></input>
            <label htmlFor='big'>Бигбас</label>
            <input
              type={'radio'}
              name='type'
              id='mini'
              value={'mini'}
            ></input>
            <label htmlFor='mini'>Минибас</label>
          </div>

          <button
            type='submit'
            onClick={addBus}
          >
            Добавить автобус
          </button>
        </fieldset>
      </form>

      <style jsx>{`
        form {
          position: relative;
        }
        fieldset {
          --space: 0.5rem;
          padding: 0.5rem;
        }

        legend {
          padding-inline: 1rem;
          font-weight: 800;
        }

        .row > * + input {
          margin-left: 1rem;
        }

        .row label {
          padding-inline: 0.3rem;
        }

        button[type='submit'] {
          margin: 1rem 0 0.5rem;
        }

        .loader {
          position: absolute;
          top: 50%;
          left: 50%;
          background-color: #e4e4e4;
          inset: 0;
          opacity: 0.4;
        }
        .loader > * {
          opacity: 1;
        }
      `}</style>
    </>
  );
}
