import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import apiClient from 'src/axios/client'
import { PersonalInfo, ProfessionalInfo } from 'src/types/apps/register'

interface RegisterState {
  personalInfo: PersonalInfo | {}
  professionalInfo: ProfessionalInfo | {}
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null | undefined | { [key: string]: string[] }
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
  async (user: { personalInfo: PersonalInfo; professionalInfo: ProfessionalInfo }, { rejectWithValue }) => {
    try {
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
    } catch (err: any) {
      if (!err.response) {
        throw err
      }

      // We got validation errors, let's return those so we can reference in our component
      return rejectWithValue(err.response.data)
    }
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
    },
    reset: () => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => {
        state.status = 'loading'
      })
      .addCase(registerUser.fulfilled, state => {
        state.status = 'succeeded'
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed'

        if (action.payload) {
          // If a payload is available, it means we have a response from the server
          //@ts-ignore
          state.error = action.payload
        } else {
          // Otherwise, we only have an error message
          state.error = action.error.message
        }
      })
  }
})

export const { setPersonalInfo, setProfessionalInfo, reset } = registerSlice.actions

export default registerSlice.reducer
