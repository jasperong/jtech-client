import React from 'react';
import { SingleDatePicker } from 'react-dates';
import { Icon } from 'semantic-ui-react';

import 'react-dates/lib/css/_datepicker.css';

const DatePicker = props => (
  <SingleDatePicker
    displayFormat="MMM DD YYYY"
    inputIconPosition="after"
    isOutsideRange={() => false}
    numberOfMonths={1}
    hideKeyboardShortcutsPanel
    showClearDate
    showDefaultInputIcon
    small
    {...props}
  />
);

export default DatePicker;
