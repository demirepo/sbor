import React from "react";
import DatePicker from "react-datepicker";

export default function DatepickerRu() {
  const days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  const locale = {
    localize: {
      day: (n) => days[n],
      month: (n) => months[n],
    },
    formatLong: {
      date: () => "mm/dd/yyyy",
    },
  };

  const [startDate, setStartDate] = React.useState(new Date());

  const onChange = (date) => setStartDate(date);

  return (
    <div>
      <DatePicker
        onChange={onChange}
        startDate={startDate}
        locale={locale}
        inline
        calendarStartDay={1}
      />
      <div>{startDate.toDateString()}</div>
    </div>
  );
}
