import React from 'react';
import Dropdown from '../Dropdown/Dropdown';
import Spinner from '../Spinner';
import useSWR from 'swr';
import HotelItem from './HotelItem';
import { fetcher } from '../../utils/fetcher';
import { Booking, Hotel } from '../../types/index';

export default function Hotels({ currentDate = new Date() }: { currentDate: Date }) {
  const [input, setInput] = React.useState('');
  const [bookings, setBookings] = React.useState<Booking[]>([]);
  const [dropdownInput, setDropdownInput] = React.useState('');

  const [currentHotel, setCurrentHotel] = React.useState<Hotel>({
    title: '',
    comment: '',
    googleName: '',
    latitude: '',
    longitude: '',
    id: '',
    iframe:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15554.935291151847!2d100.87462875741559!3d12.924821798825915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3102c090be001f0d%3A0x493d4a0fdaad4fb1!2sBali%20Hai%20Pier!5e0!3m2!1sru!2sru!4v1671739865033!5m2!1sru!2sru',
  });

  const parseAndEnrich = async (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    let bookings = (e.target as HTMLTextAreaElement).value
      .trim()
      .split('\n')
      .filter((el) => el !== '')
      .map((el) => {
        const [hotelTitle = '', room = '', pax = ''] = el.trim().split('\t');
        return {
          bookingInput: el,
          hotelTitle,
          room,
          pax: Number(pax),
          pickup: '00:00',
          findings: [],
        };
      });

    const promises = bookings.map(async (hotel: Booking) => {
      const data = await fetch('http://localhost:3000/api/hotel/' + hotel.hotelTitle);
      const hotelEntry = await data.json();

      return { ...hotel, findings: hotelEntry.data };
    });

    const result = await Promise.all(promises);
    setBookings(result);
  };

  return (
    <>
      <h2>
        {currentDate.toLocaleString('ru-RU', { weekday: 'long' })},{' '}
        {currentDate.toLocaleDateString('ru-RU', { dateStyle: 'long' })}
      </h2>
      <iframe
        src={currentHotel.iframe}
        width='auto'
        height='450'
        style={{ border: 0 }}
        loading='lazy'
        referrerPolicy='no-referrer-when-downgrade'
      ></iframe>

      <Dropdown
        currentItem={currentHotel}
        setCurrentItem={setCurrentHotel}
      />

      <br />
      <div className='buttons'></div>

      <div className='container'>
        <textarea
          className=''
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            parseAndEnrich(e);
          }}
        ></textarea>

        <div className='hotel-items'>
          {bookings.map((el: Booking, index: number) => {
            return (
              <HotelItem
                key={index}
                bookingInput={el.bookingInput}
                title={el.hotelTitle}
                room={el.room}
                pax={el.pax}
                pickup={el.pickup}
                findings={el.findings || []}
                setCurrentItem={setCurrentHotel}
                setBookings={setBookings}
              />
            );
          })}
        </div>
      </div>

      <style jsx>
        {`
          .container {
            width: 100%;
            padding: 0;
          }

          textarea {
            padding: 0.5rem;
            min-height: 10rem;
            resize: vertical;
            align-self: stretch;
            width: 100%;
          }

          .hotel-items {
            margin-top: 2rem;
          }

          .buttons {
            display: flex;
            justify-content: space-evenly;
            gap: 1rem;
            width: 100%;
            margin-top: 1rem;
          }

          .buttons > * {
            flex-basis: 100%;
          }

          button {
            display: block;
            padding: 0.1rem 1rem;
          }
        `}
      </style>
    </>
  );
}
