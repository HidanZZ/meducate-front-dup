import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import apiClient from 'src/axios/client'

interface VerificationState {
  email: string
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null | undefined | { [key: string]: string[] }
}

const initialState: VerificationState = {
  email: '',
  status: 'idle',
  error: null
}

export const resendVerificationEmail = createAsyncThunk(
  'verification/resendVerificationEmail',
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/user/verification/request', { email })

      return response.data
    } catch (err: any) {
      if (!err.response) {
        throw err
      }

      return rejectWithValue(err.response.data)
    }
  }
)

const verificationSlice = createSlice({
  name: 'verification',
  initialState,
  reducers: {
    resetVerificationState: () => initialState,
    setEmail: (state, { payload }) => {
      state.email = payload
    }
  },
  extraReducers: builder => {
    builder.addCase(resendVerificationEmail.pending, state => {
      state.status = 'loading'
    })
    builder.addCase(resendVerificationEmail.fulfilled, state => {
      state.status = 'succeeded'
    })
    builder.addCase(resendVerificationEmail.rejected, (state, action) => {
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

export const { resetVerificationState, setEmail } = verificationSlice.actions

export default verificationSlice.reducer
