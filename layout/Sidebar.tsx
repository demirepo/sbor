import React from 'react';
import styles from '../styles/components/Sidebar.module.scss';
import classnames from 'classnames';

import 'react-datepicker/dist/react-datepicker.css';
import DatepickerRu from '../components/DatepickerRu';
import BusCard from '../components/BusCard';
import AddBusForm from './../components/AddBusForm';
import BusList from './../components/BusList';

export default function Sidebar() {
  const [date, setDate] = React.useState(new Date());

  return (
    <aside className='center'>
      <div className={classnames(styles.sidebar__inner, 'box', 'stack')}>
        <DatepickerRu
          date={date}
          setDate={setDate}
        />

        <AddBusForm />

        <BusList date={date} />
      </div>
    </aside>
  );
}
