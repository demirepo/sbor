import { Hotel } from '../../types/index';

interface HotelItemProps {
  booking: string;
  title: string;
  googleName?: string;
  room: string;
  pax: number;
  pickup: string;
  findings: Array<Hotel>;
  setCurrentItem: any;
}

export default function HotelItem({ booking, title, pax, room, googleName, pickup, findings }: HotelItemProps) {
  console.log({ findings }); //! <-------------------------------- CONSOLE

  return (
    <>
      <div className='hotel__wrapper'>
        <p>Букинг: {booking}</p>
        <hr />
        <h4>{title}</h4>
        <p>Название в Google Maps: {googleName}</p>
        <p>Room: {room}</p>
        <p>Количество человек: {pax}</p>
        <p>Время выезда: {pickup}</p>
        {!!findings &&
          findings.map((el) => {
            return (
              <button
                className='button'
                key={el.id}
              >
                {el.googleName || 'не определено'}
              </button>
            );
          })}
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
      `}</style>
    </>
  );
}
