import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import DashboardService from 'src/services/dashboard'

type State = {
  name: any
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null | undefined | { [key: string]: string[] }
}

const initialState: State = {
  name: [],
  status: 'idle',
  error: null
}

// Thunk
export const getById = createAsyncThunk('dashboard/getNameById/getById', async (id: string, { rejectWithValue }) => {
  try {
    const response = await DashboardService.getByID(id)

    return response
  } catch (err: any) {
    if (!err.response) {
      throw err
    }

    return rejectWithValue(err.response.data)
  }
})

// Slice
const getNameByIdSlice = createSlice({
  name: 'dashboard/getNameById',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getById.pending, state => {
        state.status = 'loading'
      })
      .addCase(getById.fulfilled, (state, action) => {
        state.status = 'succeeded'

        // Add any fetched top names to the array
        state.name = action.payload
      })
      .addCase(getById.rejected, (state, action) => {
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

export default getNameByIdSlice.reducer
