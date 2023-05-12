import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { PersonalInfo, ProfessionalInfo } from 'src/types/apps/register'

interface RegisterState {
  personalInfo: PersonalInfo | {}
  professionalInfo: ProfessionalInfo | {}
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null | undefined
}

const initialState: RegisterState = {
  personalInfo: {
    title: 'Mr',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    country: '',
    city: ''
  },
  professionalInfo: {
    highestQualification: '',
    profile: '',
    speciality: '',
    yearsOfExperience: '',
    sector: '',
    workEnvironment: '',
    institution: ''
  },
  status: 'idle',
  error: null
}

export const registerUser = createAsyncThunk(
  'register/registerUser',
  async (user: { personalInfo: PersonalInfo; professionalInfo: ProfessionalInfo }) => {
    const response = await axios.post('/api/register', {
      ...user.personalInfo,
      ...user.professionalInfo
    })

    return response.data
  }
)

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setPersonalInfo: (state, action) => {
      state.personalInfo = action.payload
    },
    setProfessionalInfo: (state, action) => {
      state.professionalInfo = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => {
        state.status = 'loading'
      })
      .addCase(registerUser.fulfilled, state => {
        state.status = 'succeeded'

        // Add any necessary updates to state based on response here
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const { setPersonalInfo, setProfessionalInfo } = registerSlice.actions

export default registerSlice.reducer
