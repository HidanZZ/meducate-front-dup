import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import apiClient from 'src/axios/client'
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
    yearsOfExperience: Number(''),
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
    type Body = PersonalInfo & ProfessionalInfo
    const userBody: Body = {
      ...user.personalInfo,
      ...user.professionalInfo
    }

    const body: Partial<Body> = {}

    for (const key in userBody) {
      if (userBody[key as keyof Body] !== '' && userBody[key as keyof Body] !== '0' && key !== 'confirmPassword') {
        body[key as keyof Body] = userBody[key as keyof Body]
      }
    }

    const response = await apiClient.post('/auth/sign-up', body)

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

        console.log('User registered successfully')
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const { setPersonalInfo, setProfessionalInfo } = registerSlice.actions

export default registerSlice.reducer
