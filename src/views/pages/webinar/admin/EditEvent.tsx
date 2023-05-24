import React, { forwardRef, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import 'react-datepicker/dist/react-datepicker.css';
import { parseISO } from 'date-fns';

interface Speaker {
    id: number;
    firstName: string;
    lastName: string;
    picture: string;
    company: string;
    jobTitle: string;
    description: string;
}
  
interface Webinar {
    id: number;
    title: string;
    date: string;
    start_time: string;
    end_time: string;
    speaker: Speaker;
}

type FormData = {
  title: string;
  date: Date | null;
  startTime: string;
  endTime: string;
  webinarDescription: string;
  lastName: string;
  firstName: string;
  company: string;
  jobTitle: string;
  speakerDescription: string;
  gender: string;
  select: string;
  checkbox: boolean;
};

const defaultValues: FormData = {
  title: '',
  date: null,
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
  checkbox: false,
};

interface EditEventFormProps {
  open: boolean;
  webinar: Webinar;
  onClose: (value: boolean) => void;
  onSubmit: (data: Webinar) => void;
}

const CustomInput = forwardRef<HTMLInputElement, any>(({ ...props }, ref) => {
  return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} />;
});

const EditEventDialog: React.FC<EditEventFormProps> = ({ open, webinar, onClose, onSubmit }) => {
    const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ defaultValues });

  useEffect(() => {
    const webinarData = { ...webinar }; // Create a copy of the webinar object


    const newDefaultValues: FormData = {
      ...defaultValues,
      ...webinarData,
      date: parseISO(webinar.date),
    };
    reset(newDefaultValues);
}, [webinar, reset]);

  // Rest of the code...

  
  

  const handleFormSubmit = (data: FormData) => {
    const updatedWebinar: Webinar = {
      ...webinar,
      ...data,
      date: parseISO(webinar.date).toISOString().split('T')[0],
    };
  
    onSubmit(updatedWebinar);
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
                    
                    render={({ field }) => (
                    <TextField
                        {...field}
                        label='Title'
                        error={Boolean(errors.title)}
                        aria-describedby='validation-basic-title'
                        inputProps={{
                        
                        }}
                    />
                    )}
                />
                {errors.title && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-title'>
                    This field is not valid
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='date'
                control={control}
                
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    showYearDropdown
                    showMonthDropdown
                    onChange={(date) => field.onChange(date)}
                    placeholderText='MM/DD/YYYY'
                    customInput={
                      <CustomInput
                        value={webinar.date ? new Date(webinar.date) : ''}
                        onChange={field.onChange}
                        label='Date'
                        error={Boolean(errors.date)}
                        aria-describedby='validation-basic-date'
                      />
                    }
                  />
                )}
              />
              {errors.date && (
                <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-dob'>
                  This field is not valid
                </FormHelperText>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='startTime'
                control={control}
                rules={{
                  pattern: {
                    value: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
                    message: 'Invalid start time format (HH:MM)',
                  },
                }}
                render={({ field: {  onChange }, fieldState: { error } }) => (
                  <TextField
                    label='Start Time'
                    value={webinar.start_time}
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
                  pattern: {
                    value: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
                    message: 'Invalid end time format (HH:MM)',
                  },
                }}
                render={({ field: {onChange }, fieldState: { error } }) => (
                  <TextField
                    label='End Time'
                    value={webinar.end_time}
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
                  
                  render={({ field }) => (
                    <TextField
                      rows={4}
                      multiline
                      {...field}
                      label='Webinar Description'
                      error={Boolean(errors.webinarDescription)}
                      aria-describedby='validation-webinar-description'
                    />
                  )}
                />
                {errors.webinarDescription && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-webinar-description'>
                    This field is not valid
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
                  
                  render={({ field }) => (
                    <TextField
                      {...field}
                      value={webinar.speaker.firstName}
                      label='First Name'
                      placeholder='Leonard'
                      error={Boolean(errors.firstName)}
                      aria-describedby='validation-basic-first-name'
                    />
                  )}
                />
                {errors.firstName && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                    This field is not valid
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='lastName'
                  control={control}
                  
                  render={({ field }) => (
                    <TextField
                      {...field}
                      value={webinar.speaker.lastName}
                      label='Last Name'
                      placeholder='Carter'
                      error={Boolean(errors.lastName)}
                      aria-describedby='validation-basic-last-name'
                    />
                  )}
                />
                {errors.lastName && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-last-name'>
                    This field is not valid
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='company'
                  control={control}
                  
                  render={({ field }) => (
                    <TextField
                      {...field}
                      value={webinar.speaker.company}
                      label='Company'
                      placeholder='Meducate'
                      error={Boolean(errors.company)}
                      aria-describedby='validation-basic-company'
                    />
                  )}
                />
                {errors.company && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-company'>
                    This field is not valid
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='jobTitle'
                  control={control}
                  
                  render={({ field }) => (
                    <TextField
                      {...field}
                      value={webinar.speaker.jobTitle}
                      label='Job Title'
                      placeholder='CEO'
                      error={Boolean(errors.jobTitle)}
                      aria-describedby='validation-job-title'
                    />
                  )}
                />
                {errors.jobTitle && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-job-title'>
                    This field is not valid
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='speakerDescription'
                  control={control}
                  
                  render={({ field }) => (
                    <TextField
                      rows={4}
                      multiline
                      {...field}
                      value={webinar.speaker.description}
                      label='Speaker Description'
                      error={Boolean(errors.speakerDescription)}
                      aria-describedby='validation-speaker-description'
                    />
                  )}
                />
                {errors.speakerDescription && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-speaker-description'>
                    This field is not valid
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
                  
                  render={({ field }) => (
                    <RadioGroup row {...field} aria-label='gender' name='validation-basic-gender' >
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
                    This field is not valid
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>

          <Button type='submit' variant='contained' color='primary'>
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
      );
}

export default EditEventDialog