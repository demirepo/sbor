import { Hotel } from '../../types/index';
import classNames from 'classnames';

interface HotelItemProps {
  booking: string;
  title: string;
  googleName?: string;
  room: string;
  pax: number;
  pickup: string;
  findings: Array<Hotel>;
  setCurrentItem: React.Dispatch<React.SetStateAction<Hotel>>;
}

// =============================================================================

export default function HotelItem({
  booking,
  title,
  pax,
  room,
  googleName,
  pickup,
  findings,
  setCurrentItem,
}: HotelItemProps) {
  const selectOptionalHotelOnMap = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const id = (e.target as EventTarget & { id: string }).id;
    if (id) {
      const hotel = findings.find((el) => String(el.id) === id);
      hotel && setCurrentItem(hotel);
    }
  };

  return (
    <>
      <div
        className={classNames({
          radio: true,
          hotel__wrapper: true,
          good: findings.length === 1,
          attention: findings.length > 1,
          bad: findings.length === 0,
        })}
      >
        <p>Букинг: {booking}</p>
        <hr />
        <h4>{title}</h4>
        <p>Название в Google Maps: {googleName}</p>
        <p>Room: {room}</p>
        <p>Количество человек: {pax}</p>
        <p>Время выезда: {pickup}</p>
        <div className=''>
          {!!findings &&
            findings.map((el) => {
              return (
                <div key={el.id}>
                  <input
                    type={'radio'}
                    className='button'
                    name='hotels'
                    id={String(el.id)}
                    value={el.id}
                    onClick={selectOptionalHotelOnMap}
                  ></input>

                  <label htmlFor={String(el.id)}>{el.googleName || el.title || 'не определено'}</label>
                </div>
              );
            })}
        </div>
      </div>

      <style jsx>{`
        .hotel__wrapper {
          padding: 1rem;
          border: 1px solid;
          background-color: #fff;
        }

        .button {
          padding: 0.1rem 0.5rem;
        }

        input,
        label {
          display: inline;
        }

        .attention {
          border: 2px solid orange;
        }

        .good {
          border: 2px solid lime;
        }

        .bad {
          border: 2px solid red;
        }
      `}</style>
    </>
  );
}
