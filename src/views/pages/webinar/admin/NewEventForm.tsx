import React, { forwardRef, useState } from 'react'

import { useForm, Controller } from 'react-hook-form'
import DatePicker from 'react-datepicker'

import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import FormControlLabel from '@mui/material/FormControlLabel'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'



const defaultValues = {
    dob: null,
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    webinarDescription: '',
    
    lastName: '',
    firstName: '',
    company: '',
    jobTitle: '',
    speakerDescription: '',
    gender: '',

    select: '',
    checkbox: false
}
  
const CustomInput = forwardRef(({ ...props }, ref) => {
    return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} />
})

interface NewEventFormProps {
    open: boolean;
    onClose: (value: boolean) => void;
    onSubmit: (data: any) => void;
}
  
const NewEventForm: React.FC<NewEventFormProps> = ({ open, onClose, onSubmit }) => {   
   const [state, setState] = useState({
    password: '',
    showPassword: false
  })

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })
  
  
  const handleFormSubmit = (data) => {
    onSubmit(data);
    onClose(false);
  };

  return (
    <Dialog open={open} onClose={() => onClose(false)} fullWidth>
      <DialogTitle>Webinar Confirmation</DialogTitle>
      <DialogContent>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
      <DialogTitle>Webinar info :</DialogTitle>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='title'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Title'
                      onChange={onChange}
                      placeholder='title'
                      error={Boolean(errors.title)}
                      aria-describedby='validation-basic-title'
                    />
                  )}
                />
                {errors.title && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-title'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='date'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    selected={value}
                    showYearDropdown
                    showMonthDropdown
                    onChange={e => onChange(e)}
                    placeholderText='MM/DD/YYYY'
                    customInput={
                      <CustomInput
                        value={value}
                        onChange={onChange}
                        label='Date '
                        error={Boolean(errors.date)}
                        aria-describedby='validation-basic-date'
                      />
                    }
                  />
                )}
              />
              {errors.date && (
                <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-dob'>
                  This field is required
                </FormHelperText>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
                <Controller
                    name='startTime'
                    control={control}
                    rules={{
                    required: true,
                    pattern: {
                        value: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
                        message: 'Invalid start time format (HH:MM)',
                    },
                    }}
                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                    <TextField
                        label='Start Time'
                        value={value}
                        onChange={onChange}
                        error={Boolean(error)}
                        helperText={error?.message || ''}
                        placeholder='HH:MM'
                    />
                    )}
                />
            </Grid>


            <Grid item xs={12} sm={6}>
            <Controller
                    name='endTime'
                    control={control}
                    rules={{
                    required: true,
                    pattern: {
                        value: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
                        message: 'Invalid end time format (HH:MM)',
                    },
                    }}
                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                    <TextField
                        label='End Time'
                        value={value}
                        onChange={onChange}
                        error={Boolean(error)}
                        helperText={error?.message || ''}
                        placeholder='HH:MM'
                    />
                    )}
                />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='webinarDescription'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      rows={4}
                      multiline
                      {...field}
                      label='Webinar Description'
                      error={Boolean(errors.speakerDescription)}
                      aria-describedby='validation-webinar-description'
                    />
                  )}
                />
                {errors.webinarDescription && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-webinar-description'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
        </Grid>

        <DialogTitle>Speaker info :</DialogTitle>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='firstName'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='First Name'
                      onChange={onChange}
                      placeholder='Leonard'
                      error={Boolean(errors.firstName)}
                      aria-describedby='validation-basic-first-name'
                    />
                  )}
                />
                {errors.firstName && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='lastName'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Last Name'
                      onChange={onChange}
                      placeholder='Carter'
                      error={Boolean(errors.lastName)}
                      aria-describedby='validation-basic-last-name'
                    />
                  )}
                />
                {errors.lastName && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-last-name'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='company'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Company'
                      onChange={onChange}
                      placeholder='Meducate'
                      error={Boolean(errors.company)}
                      aria-describedby='validation-basic-company'
                    />
                  )}
                />
                {errors.company && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-company'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='jobTitle'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Job Title'
                      onChange={onChange}
                      placeholder='CEO'
                      error={Boolean(errors.company)}
                      aria-describedby='validation-job-title'
                    />
                  )}
                />
                {errors.jobTitle && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-job-title'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='speakerDescription'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      rows={4}
                      multiline
                      {...field}
                      label='Speaker Description'
                      error={Boolean(errors.speakerDescription)}
                      aria-describedby='validation-speaker-description'
                    />
                  )}
                />
                {errors.speakerDescription && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-speaker-description'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl error={Boolean(errors.gender)}>
                <FormLabel>Gender</FormLabel>
                <Controller
                  name='gender'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <RadioGroup row {...field} aria-label='gender' name='validation-basic-gender'>
                      <FormControlLabel
                        value='female'
                        label='Female'
                        sx={errors.gender ? { color: 'error.main' } : null}
                        control={<Radio sx={errors.gender ? { color: 'error.main' } : null} />}
                      />
                      <FormControlLabel
                        value='male'
                        label='Male'
                        sx={errors.gender ? { color: 'error.main' } : null}
                        control={<Radio sx={errors.gender ? { color: 'error.main' } : null} />}
                      />
                      <FormControlLabel
                        value='other'
                        label='Other'
                        sx={errors.gender ? { color: 'error.main' } : null}
                        control={<Radio sx={errors.gender ? { color: 'error.main' } : null} />}
                      />
                    </RadioGroup>
                  )}
                />
                {errors.gender && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-gender'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button size='large' type='submit' variant='contained'>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
}  

export default NewEventForm;
