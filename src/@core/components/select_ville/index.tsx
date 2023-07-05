// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

const SelectControlledUncontrolled = () => {
  // ** State
  const [value, setValue] = useState<string>('')

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string)
  }

  return (
    <div className='demo-space-x'>
      <FormControl>
        <InputLabel id='controlled-select-label'>Marrakech</InputLabel>
        <Select
          value={value}
          label='Controlled'
          id='controlled-select'
          onChange={handleChange}
          labelId='controlled-select-label'
        >
          <MenuItem value={10}>Tanger</MenuItem>
          <MenuItem value={20}>Casablanca</MenuItem>
          <MenuItem value={30}>Rabat</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default SelectControlledUncontrolled
