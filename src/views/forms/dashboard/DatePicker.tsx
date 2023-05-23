// ** React Imports
import { useState, forwardRef } from 'react'

// ** MUI Imports
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import TextField from '@mui/material/TextField'

// ** Third Party Imports
import format from 'date-fns/format'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'


interface PickerProps {
  label?: string
  end: Date | number
  start: Date | number
}
type DateType = Date | null | undefined

const DatePickerRange = ({ popperPlacement ,onDateSelected}: { popperPlacement: ReactDatePickerProps['popperPlacement'] ,
onDateSelected: (dates: any) => void
}) => {
  
  const [startDateRange, setStartDateRange] = useState<DateType>(null)
  const [endDateRange, setEndDateRange] = useState<DateType>(null)

  

  const handleOnChangeRange = (dates: any) => {
    const [start, end] = dates
    setStartDateRange(start)
    setEndDateRange(end)
    onDateSelected(dates)
  }

  const CustomInput = forwardRef((props: PickerProps, ref) => {
    let value = ''
    if(props.start && props.end) {
        const startDate = format(props.start, 'MM/yyyy')
    const endDate = props.end !== null ? ` - ${format(props.end, 'MM/yyyy')}` : null

     value = `${startDate}${endDate !== null ? endDate : ''}`
    }

    return <TextField inputRef={ref} label={props.label || ''} {...props} value={value} />
  })

  return (
      <DatePickerWrapper>
        <DatePicker
          selectsRange
        isClearable
          monthsShown={2}
          endDate={endDateRange}
          selected={startDateRange}
          startDate={startDateRange}
          shouldCloseOnSelect={true}
          id='date-range-picker-months'
          onChange={handleOnChangeRange}
          popperPlacement={popperPlacement}
          customInput={
            <CustomInput
              label='From - To'
              end={endDateRange as Date | number}
              start={startDateRange as Date | number}
            />
          }
        />
      </DatePickerWrapper>
  )
}

export default DatePickerRange
