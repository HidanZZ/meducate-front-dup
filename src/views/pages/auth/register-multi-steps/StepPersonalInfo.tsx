import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import Icon from 'src/@core/components/icon'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormHelperText, IconButton, InputAdornment, MenuItem, Select } from '@mui/material'
import { useSelector } from 'react-redux'
import { City, Country } from 'src/types/misc/countries'
import { PersonalInfo, Title } from 'src/types/apps/register'
import { useDispatch } from 'react-redux'
import { setPersonalInfo } from 'src/store/apps/register'

interface PasswordInfo {
  password: string;
  confirmPassword: string;
}
type ExtendedPersonalInfo = PersonalInfo & PasswordInfo;
const StepPersonalDetails = ({ handleNext }: { handleNext: () => void }) => {
  // const { countries, cities } = useSelector((state: any) => state.countries)
  const countries = [
    {
      name: 'United States',
      iso2: 'US'
    },
    {
      name: 'United Kingdom',
      iso2: 'GB'
    },
    {
      name: 'Afghanistan',
      iso2: 'AF'
    }
  ]
  const schema = yup.object().shape({
    title: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
    phone: yup.string().required(),
    country: yup.string().required(),
    city: yup.string().required()
  })
  const [showPassword, setShowPassword] = React.useState(false)
  const handleMouseDownPassword = (event: any) => {
    //@ts-ignore
    event.preventDefault()
  }
  const dispatch = useDispatch()
  const {personalInfo}:{personalInfo:ExtendedPersonalInfo } = useSelector((state: any) => state.register)

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    defaultValues: personalInfo,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })
  const watchCountry = watch('country')
  const onSubmit = (data: PersonalInfo) => {
    console.log(data)
    dispatch(setPersonalInfo(data))
    handleNext()
  }
  const fetchCities = (country: string) => {
    console.log(country)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ mb: 4 }}>
        <Typography variant='h5'>Personal Information</Typography>
        <Typography sx={{ color: 'text.secondary' }}>Enter Your Personal Information</Typography>
      </Box>

      <Grid container spacing={5}>
        <Grid item xs={12} sm={2}>
          <FormControl fullWidth>
            <Controller
              name='title'
              control={control}
              render={({ field }) => (
                <>
                  <InputLabel id='title-label'>Title</InputLabel>
                  <Select
                    label='Title'
                    labelId='title-label'
                    {...field}
                    fullWidth
                    placeholder='Title'
                    error={Boolean(errors.title)}
                  >
                    {
                      Object.entries(Title).map(([key, value]) => (
                        <MenuItem key={key} value={key}>{value}</MenuItem>
                      ))
                    }
                  </Select>
                </>
              )}
            />
            {errors.title && <FormHelperText sx={{ color: 'error.main' }}>{errors.title.message}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={5}>
          <FormControl fullWidth>
            <Controller
              name='firstName'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label='First Name'
                  placeholder='John'
                  error={Boolean(errors.firstName)}
                />
              )}
            />
            {errors.firstName && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.firstName.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={5}>
          <FormControl fullWidth>
            <Controller
              name='lastName'
              control={control}
              render={({ field }) => (
                <TextField {...field} fullWidth label='Last Name' placeholder='Doe' error={Boolean(errors.lastName)} />
              )}
            />
            {errors.lastName && <FormHelperText sx={{ color: 'error.main' }}>{errors.lastName.message}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <Controller
              name='email'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type='email'
                  label='Email'
                  placeholder='john.doe@email.com'
                  error={Boolean(errors.email)}
                />
              )}
            />
            {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Controller
              name='password'
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel htmlFor='input-password'>Password</InputLabel>
                  <OutlinedInput
                    {...field}
                    label='Password'
                    id='input-password'
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={() => setShowPassword(!showPassword)}
                          onMouseDown={handleMouseDownPassword}
                        >
                          <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                        </IconButton>
                      </InputAdornment>
                    }
                    error={Boolean(errors.password)}
                  />
                </FormControl>
              )}
            />
            {errors.password && <FormHelperText sx={{ color: 'error.main' }}>{errors.password.message}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Controller
              name='confirmPassword'
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel htmlFor='input-confirm-password'>Confirm Password</InputLabel>
                  <OutlinedInput
                    {...field}
                    label='Confirm Password'
                    id='input-confirm-password'
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={() => setShowPassword(!showPassword)}
                          onMouseDown={handleMouseDownPassword}
                        >
                          <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                        </IconButton>
                      </InputAdornment>
                    }
                    error={Boolean(errors.confirmPassword)}
                  />
                </FormControl>
              )}
            />
            {errors.confirmPassword && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.confirmPassword.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <Controller
              name='phone'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label='Phone Number'
                  placeholder='(123) 456-7890'
                  error={Boolean(errors.phone)}
                />
              )}
            />
            {errors.phone && <FormHelperText sx={{ color: 'error.main' }}>{errors.phone.message}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Controller
              name='country'
              control={control}
              render={({ field: { value, onChange } }) => (
                <>
                  <InputLabel id='country-label'>Country</InputLabel>
                  <Select
                    label='Country'
                    labelId='country-label'
                    value={value}
                    onChange={(e: any) => {
                      onChange(e.target.value)
                      fetchCities(e.target.value)
                    }}
                    fullWidth
                    placeholder='Country'
                    error={Boolean(errors.country)}
                  >
                    {countries.map((country: Country) => (
                      <MenuItem key={country.iso2} value={country.iso2}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </Select>
                </>
              )}
            />
            {errors.country && <FormHelperText sx={{ color: 'error.main' }}>{errors.country.message}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Controller
              name='city'
              control={control}
              render={({ field }) => (
                <>
                  <InputLabel id='city-label'>City</InputLabel>
                  <Select
                    label='City'
                    labelId='city-label'
                    {...field}
                    fullWidth
                    placeholder='City'
                    error={Boolean(errors.city)}
                    disabled={!watchCountry}
                  >
                    {countries.map((city: City) => (
                      <MenuItem key={city.name} value={city.name}>
                        {city.name}
                      </MenuItem>
                    ))}
                  </Select>
                </>
              )}
            />
            {errors.city && <FormHelperText sx={{ color: 'error.main' }}>{errors.city.message}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button disabled variant='contained' startIcon={<Icon icon='mdi:chevron-left' fontSize={20} />}>
              Previous
            </Button>
            <Button type='submit' variant='contained' endIcon={<Icon icon='mdi:chevron-right' fontSize={20} />}>
              Next
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  )
}

export default StepPersonalDetails
