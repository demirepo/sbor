import { Booking, Hotel } from '../../types/index';
import classNames from 'classnames';
import React from 'react';
import PersonIcon from '../icons/PersonIcon';
import HotelIcon from './../icons/HotelIcon';
import RoomIcon from './../icons/RoomIcon';

interface HotelItemProps {
  bookingInput: string;
  title: string;
  googleName?: string;
  room: string;
  pax: number;
  pickup: string;
  findings: Array<Hotel>;
  setCurrentItem: React.Dispatch<React.SetStateAction<Hotel>>;
  setBookings: React.Dispatch<React.SetStateAction<any[]>>;
}

// =============================================================================

type HotelStatus = 'ok' | 'multiple found' | 'not found' | 'pending';

export default function HotelItem({
  bookingInput,
  title,
  pax,
  room,
  pickup,
  findings,
  setCurrentItem,
  setBookings,
}: HotelItemProps) {
  let status: HotelStatus = 'pending';
  const isHotelSelectFormShown = findings && findings.length > 1;

  if (isHotelSelectFormShown) {
    status = 'multiple found';
  } else if (findings.length === 0) {
    status = 'not found';
  } else if (findings.length === 1) {
    status = 'ok';
  }

  const handleShowHotelOnMap = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const id = getIdFromEventTarget(e);
    setCurrentItemById(id);
  };

  const handleSelectHotel = (e: React.SyntheticEvent<SubmitEventInit>) => {
    e.preventDefault();

    const form = (e.target as HTMLFormElement).form;
    const radioInputs = form.querySelectorAll('input[type="radio"]');
    const checkedId = Array.prototype.find.call(radioInputs, (el) => el.checked).id;

    setBookings((booking: Booking[]) => {
      const newBooking = filterFindingsInBookingById(booking, checkedId);
      return newBooking;
    });
  };

  function setCurrentItemById(id: string) {
    if (id) {
      const hotel = findings.find((el) => String(el.id) === id);
      hotel && setCurrentItem(hotel);
    }
  }

  function getIdFromEventTarget(e: React.SyntheticEvent<HTMLInputElement>) {
    return (e.target as EventTarget & { id: string }).id;
  }

  function filterFindingsInBookingById(booking: Booking[], id: string) {
    const newBooking = booking.map((el: Booking) => {
      if (el.hotelTitle !== title) return el;

      const newFinding = el?.findings?.find((el: Hotel) => el.id == id);
      const newTitle = newFinding?.title;

      return { ...el, hotelTitle: newTitle, findings: [newFinding] };
    });
    return newBooking;
  }

  return (
    <>
      <div
        className={classNames({
          'hotel-item': true,
          good: status === 'ok',
          attention: status === 'multiple found',
          bad: status === 'not found',
        })}
      >
        <div className='hotel-item__hotels'>
          <header>
            <HotelIcon />
            <h3>{title}</h3>
            <RoomIcon />
            <span>{room || 'н/д'}</span>
          </header>

          <p className='hotel-item__booking'>{bookingInput}</p>

          {isHotelSelectFormShown && (
            <form className='hotel-item__findings'>
              {findings.map((el) => {
                return (
                  <>
                    <div key={el.id}>
                      <input
                        type={'radio'}
                        className='button'
                        name='hotels'
                        id={String(el.id)}
                        value={el.id}
                        onClick={handleShowHotelOnMap}
                      ></input>

                      <label htmlFor={String(el.id)}>{el.title || el.googleName || 'не определено'}</label>
                    </div>
                  </>
                );
              })}
              <button
                type='submit'
                onClick={handleSelectHotel}
              >
                Выбрать
              </button>
            </form>
          )}
        </div>

        <div className='hotel-item__pax'>
          <PersonIcon />
          <p>{pax ? `${pax} pax` : 'н/д'}</p>
        </div>

        <div className='hotel-item__pickup'>{pickup}</div>
      </div>

      <style jsx>{`
        .hotel-item {
          display: flex;
          padding: 0.5rem 1rem;
          border: 1px solid;
          background-color: #fff;
          margin-top: 0.5rem;
        }

        header {
          display: flex;
          align-items: center;
        }

        .room-svg,
        .hotel-svg {
          margin-right: 0.5rem;
          flex-shrink: 0;
        }

        .room-svg {
          margin-left: 2rem;
        }

        .hotel-item__booking {
          opacity: 0.6;
          padding-block: 0.5rem 0.5rem;
        }

        .hotel-item__pax {
          margin-left: auto;
        }

        .hotel-item__pax,
        .hotel-item__pickup {
          padding-inline: 0.5rem;
          align-self: center;
          flex-basis: 10%;
        }

        .button {
          padding: 0.1rem 0.5rem;
        }

        input,
        label {
          display: inline;
        }

        label {
          margin-left: 0.5rem;
        }

        .attention {
          border: 2px solid orange;
        }

        .good {
          border: 2px solid green;
        }

        .bad {
          border: 2px solid red;
        }
      `}</style>
    </>
  );
}
