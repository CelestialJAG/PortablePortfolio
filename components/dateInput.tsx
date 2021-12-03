import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import getDateFormat from "../helpers/getDateFormat";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const DateInput = ({ currentProject }: any) => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <Box color="black">
      <DatePicker
        selected={startDate}
        onChange={(date: Date) => {
          currentProject["dateCreated"] = getDateFormat(date);
          setStartDate(date);
        }}
      />
    </Box>
  );
};
export default DateInput;
