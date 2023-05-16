import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField' 
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Icon from 'src/@core/components/icon'
import Cleave from 'cleave.js/react'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormHelperText,MenuItem, Select } from '@mui/material'
import { useSelector } from 'react-redux'
import {  HighestQualification, PersonalInfo, ProfessionalInfo, Profile, Sector, WorkEnvironment } from 'src/types/apps/register'
import { useDispatch } from 'react-redux'
import { registerUser, setProfessionalInfo } from 'src/store/apps/register'
import { AppDispatch } from 'src/store'
import CleaveWrapper from 'src/@core/styles/libs/react-cleave'

const StepProfessionalInfo = ({ handlePrev }: { handlePrev: () => void }) => {
  const {personalInfo,professionalInfo}:{personalInfo:PersonalInfo,professionalInfo:ProfessionalInfo} = useSelector((state: any) => state.register)
  const schema = yup.object().shape({
    highestQualification: yup.string(),
    profile: yup.string(),
    speciality: yup.string(),
    yearsOfExperience: yup.string(),
    sector: yup.string(),
    workEnvironment: yup.string(),
    institution: yup.string(),
  })
  const dispatch = useDispatch<AppDispatch>()

  

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: professionalInfo,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })
  const onSubmit = (data: ProfessionalInfo) => {
    dispatch(setProfessionalInfo(data))

   dispatch(registerUser({ personalInfo, professionalInfo: data }));
  }
  

  return (
    <CleaveWrapper>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ mb: 4 }}>
        <Typography variant='h5'>Professional Information</Typography>
        <Typography sx={{ color: 'text.secondary' }}>Enter Your Professional Information</Typography>
      </Box>

      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Controller
              name='highestQualification'
              control={control}
              render={({ field }) => (
                <>
                  <InputLabel id='highestQualification-label'>Highest Qualification</InputLabel>
                  <Select
                    label='Highest Qualification'
                    labelId='highestQualification-label'
                    {...field}
                    fullWidth
                    placeholder='highestQualification'
                    error={Boolean(errors.highestQualification)}
                  >
                    {
                      Object.entries(HighestQualification).map(([key, value]) => (
                        <MenuItem key={key} value={key}>{value}</MenuItem>
                      ))
                    }
                  </Select>
                </>
              )}
            />
            {errors.highestQualification && <FormHelperText sx={{ color: 'error.main' }}>{errors.highestQualification.message}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Controller
              name='profile'
              control={control}
              render={({ field }) => (
                <>
                  <InputLabel id='profile-label'>Profile</InputLabel>
                  <Select
                    label='Profile'
                    labelId='profile-label'
                    {...field}
                    fullWidth
                    placeholder='Profile'
                    error={Boolean(errors.profile)}
                  >
                    {
                      Object.entries(Profile).map(([key, value]) => (
                        <MenuItem key={key} value={key}>{value}</MenuItem>
                      ))
                    }
                  </Select>
                </>
              )}
            />
            {errors.profile && <FormHelperText sx={{ color: 'error.main' }}>{errors.profile.message}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12} >
          <FormControl fullWidth>
            <Controller
              name='speciality'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label='Speciality'
                  placeholder='Surgeon'
                  error={Boolean(errors.speciality)}
                />
              )}
            />
            {errors.speciality && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.speciality.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Controller
              name='sector'
              control={control}
              render={({ field }) => (
                <>
                  <InputLabel id='sector-label'>Sector</InputLabel>
                  <Select
                    label='Sector'
                    labelId='sector-label'
                    {...field}
                    fullWidth
                    placeholder='sector'
                    error={Boolean(errors.sector)}
                  >
                   {
                      Object.entries(Sector).map(([key, value]) => (
                        <MenuItem key={key} value={key}>{value}</MenuItem>
                      ))
                   }
                  </Select>
                </>
              )}
            />
            {errors.sector && <FormHelperText sx={{ color: 'error.main' }}>{errors.sector.message}</FormHelperText>}
          </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Controller
              name='yearsOfExperience'
              control={control}
              render={({ field }) => (
                 <Cleave id='numeral' placeholder='years' options={{ numeral: true }} {...field} style={{
                  width: '100%',
                 }} />
              )}
            />
            {errors.yearsOfExperience && <FormHelperText sx={{ color: 'error.main' }}>{errors.yearsOfExperience.message}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <Controller
              name='institution'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type='text'
                  label='institution'
                  placeholder='institution'
                  error={Boolean(errors.institution)}
                />
              )}
            />
            {errors.institution && <FormHelperText sx={{ color: 'error.main' }}>{errors.institution.message}</FormHelperText>}
          </FormControl>
        </Grid>
       <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Controller
              name='workEnvironment'
              control={control}
              render={({ field }) => (
                <>
                  <InputLabel id='workEnvironment-label'>Work Environment</InputLabel>
                  <Select
                    label='workEnvironment'
                    labelId='workEnvironment-label'
                    {...field}
                    fullWidth
                    placeholder='workEnvironment'
                    error={Boolean(errors.workEnvironment)}
                  >
                    {
                      Object.entries(WorkEnvironment).map(([key, value]) => (
                        <MenuItem key={key} value={key}>{value}</MenuItem>
                      ))
                    }
                    <MenuItem value='Prof'>Prof</MenuItem>
                  </Select>
                </>
              )}
            />
            {errors.workEnvironment && <FormHelperText sx={{ color: 'error.main' }}>{errors.workEnvironment.message}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              color='secondary'
              variant='contained'
              onClick={handlePrev}
              startIcon={<Icon icon='mdi:chevron-left' fontSize={20} />}
            >
              Previous
            </Button>
            <Button type='submit' color='success' variant='contained'>
              Submit
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
    </CleaveWrapper>
  )
}

export default StepProfessionalInfo
