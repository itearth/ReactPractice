// Filter.js
import React from 'react';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const CustomFilter = ({ filterValues, handleFilterChange, columnId }) => {
  return (
    <FormControl size="small">
      <Input
        id={`filter-${columnId}`}
        value={filterValues[columnId] || ''}
        onChange={(event) => handleFilterChange(event, columnId)}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default CustomFilter;
