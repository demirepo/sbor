import React from 'react';
import { BusType } from '../types';
import { busType } from './../utils/busTypes';

interface BusCardProps {
  date: Date;
  tour: string;
  type: BusType;
  handleClick: () => void;
}

export default function BusCard({ date, tour, type, handleClick }: BusCardProps) {
  const dateString = ` - ${date.toLocaleString('ru-RU', { dateStyle: 'short' })}`;

  return (
    <>
      <button
        onClick={handleClick}
        className='bus'
      >
        <header>
          {tour}
          {date ? dateString : ''}
        </header>
        <p>{busType(type)}</p>
      </button>

      <style jsx>{`
        button {
          border: 1px solid;
          padding: 0.5rem;
          text-align: left;
        }

        header {
          font-size: 1.2rem;
          font-weight: 800;
        }

        p {
          font-size: 0.8rem;
        }
      `}</style>
    </>
  );
}
