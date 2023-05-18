import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import apiClient from 'src/axios/client'
import { FormInputs } from 'src/types/apps/login'

export const signin = createAsyncThunk('login/initiate', async (payload: FormInputs, { rejectWithValue }) => {
  try {
    const response = await apiClient.post('/auth/sign-in', payload)

    return response.data
  } catch (err: any) {
    return rejectWithValue(err.response.data)
  }
})
const initialState = {
  loading: false,
  error: null,
  userInfo: null
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(signin.pending, state => {
        state.loading = true
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false
        state.userInfo = action.payload
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false

        //@ts-ignore
        state.error = action.payload
      })
  }
})

export default loginSlice.reducer
