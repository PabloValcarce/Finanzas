import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import './DateRangePicker.css';

function DateRangePicker({ startDate, endDate, onDateRangeChange, onReset }) {
  const normalizeDate = (date, endOfDay = false) => {
    if (date) {
      const normalizedDate = new Date(date);
      normalizedDate.setHours(endOfDay ? 23 : 0, endOfDay ? 59 : 0, endOfDay ? 59 : 0, endOfDay ? 999 : 0);
      return normalizedDate;
    }
    return null;
  };

  const handleStartDateChange = (date) => {
    onDateRangeChange({
      startDate: normalizeDate(date),
      endDate: normalizeDate(endDate, true),
    });
  };

  const handleEndDateChange = (date) => {
    onDateRangeChange({
      startDate: normalizeDate(startDate),
      endDate: normalizeDate(date, true),
    });
  };

  return (
    <div className="date-picker">
      <DatePicker
        selected={startDate}
        onChange={handleStartDateChange}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        dateFormat="dd/MM/yyyy"
        placeholderText="Fecha inicial"
      />
      <DatePicker
        selected={endDate}
        onChange={handleEndDateChange}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        dateFormat="dd/MM/yyyy"
        placeholderText="Fecha final"
      />
      <button type="button" className="reset-dates-button" onClick={onReset}>
        <FontAwesomeIcon icon={faRotateRight} />
      </button>
    </div>
  );
}

export default DateRangePicker;
