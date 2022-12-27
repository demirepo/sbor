import React from 'react';
import DatePicker from 'react-datepicker';

interface DatepickerProps {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

export default function DatepickerRu({ date, setDate }: DatepickerProps) {
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
      day: (n: any) => days[n],
      month: (n: any) => months[n],
    },
    formatLong: {
      date: () => 'mm/dd/yyyy',
    },
  } as Locale;

  return (
    <div>
      <DatePicker
        onChange={(date) => setDate(date || new Date())}
        startDate={date}
        locale={locale}
        inline
        calendarStartDay={1}
      />
    </div>
  );
}
