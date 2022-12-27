import React, { Dispatch } from 'react';
import styles from '../styles/components/Sidebar.module.scss';
import classnames from 'classnames';

import 'react-datepicker/dist/react-datepicker.css';
import DatepickerRu from '../components/DatepickerRu';
import BusCard from '../components/BusForm/BusCard';
import AddBusForm from '../components/BusForm/BusForm';
import BusList from './../components/BusForm/BusList';

interface SidebarProps {
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  date: Date;
}

export default function Sidebar({ date, setDate: setCurrentDate }: SidebarProps) {
  return (
    <aside className='center'>
      <div className={classnames(styles.sidebar__inner, 'box', 'stack')}>
        <DatepickerRu
          date={date}
          setDate={setCurrentDate}
        />

        <AddBusForm />

        <BusList date={date} />
      </div>
    </aside>
  );
}
