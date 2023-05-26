import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useSelector } from 'react-redux';
import SimpleSpinner from 'src/@core/components/spinner/Spinner';

type SearchFieldProps = {
    inputValue: string
    setInputValue: (value: string) => void
}

const SearchField = ({
    inputValue,
    setInputValue
}:SearchFieldProps) => {
  
  const [isDisabled, setIsDisabled] = useState(true);
  const controls = useAnimation();
  const {status  } = useSelector((state: any) => state.dashboard.searchNames);

  
  const handleMouseEnter = async () => {
    await controls.start({
      width: '100%',
      transition: { duration: 0.5 }
    });
    setIsDisabled(false);
  };
  
  const handleMouseLeave = async () => {
    if (inputValue === '') {
      await controls.start({
        width: '50px',
        transition: { duration: 0.5 }
      });
      setIsDisabled(true);
    }
  };
  
  const handleInputChange = (event:any) => {
    setInputValue(event.target.value);
  };
  const handleClearInput = () => {
    setInputValue('');
  };

  return (
    <motion.div
      style={{ width: '50px' }}
      animate={controls}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <TextField
        fullWidth
        disabled={isDisabled}
        variant="standard"
        onChange={handleInputChange}
        value={inputValue}
        sx={{ '& .MuiInputBase-input': { fontSize: '25px' } }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
                {
                  status === 'loading'? (
                    <SimpleSpinner 
                    sx={{ height: '30px', width: '30px' }}
                    />
                  ) : (
                    <SearchIcon 
                    sx={{ fontSize: '30px' }}
                />
                  )
                }
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
                {!isDisabled && inputValue && 
                <IconButton onClick={handleClearInput}>
                  <ClearIcon />
                </IconButton>
              }
            </InputAdornment>
            )
        }}
      />
    </motion.div>
  );
};

export default SearchField;
