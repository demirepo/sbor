import React from 'react';
import DatePicker from 'react-datepicker';

export default function DatepickerRu({ date, setDate }) {
  const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];

  const locale = {
    localize: {
      day: (n) => days[n],
      month: (n) => months[n],
    },
    formatLong: {
      date: () => 'mm/dd/yyyy',
    },
  };

  return (
    <div>
      <DatePicker
        onChange={(date) => setDate(date)}
        startDate={date}
        locale={locale}
        inline
        calendarStartDay={1}
      />
    </div>
  );
}
