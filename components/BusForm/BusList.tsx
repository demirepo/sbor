import React from 'react';
import BusCard from './BusCard';
import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import Modal from '../Modal';

interface BusListProps {
  date: Date;
}

export default function BusList({ date }: BusListProps) {
  const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`; // YYYY-MM-DD
  const { data, isLoading } = useSWR<any>('http://localhost:3000/api/bus/' + dateString, fetcher);
  const [showModal, setShowModal] = React.useState(false);

  const closeModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <h4 className='tac'>Планируемые автобусы</h4>
      <Modal
        // title='Заголовок'
        show={showModal}
        onClose={closeModal}
      >
        {/* <div>Тело модального окна</div> */}
      </Modal>
      {data?.data?.map((el: any) => {
        return (
          <BusCard
            key={el.id}
            tour={el.tourName}
            date={date}
            type={el.type}
            handleClick={() => setShowModal(true)}
          />
        );
      })}
    </>
  );
}
