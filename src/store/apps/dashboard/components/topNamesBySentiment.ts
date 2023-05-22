import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import DashboardService from 'src/services/dashboard'
import { DateRangeWithSentiment } from 'src/types/apps/dashboard'

type State = {
  topNames: any
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null | undefined | { [key: string]: string[] }
}

const initialState: State = {
  topNames: [],
  status: 'idle',
  error: null
}

// Thunk
export const fetchTopNamesBySentiment = createAsyncThunk(
  'dashboard/topNamesBySentimentChart/fetchTopNamesBySentiment',
  async (fields: DateRangeWithSentiment, { rejectWithValue }) => {
    try {
      const response = await DashboardService.getTopNamesBySentiment(fields)

      return response
    } catch (err: any) {
      if (!err.response) {
        throw err
      }

      return rejectWithValue(err.response.data)
    }
  }
)

// Slice
const topNamesBySentimentChartSlice = createSlice({
  name: 'dashboard/topNamesBySentimentChart',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTopNamesBySentiment.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchTopNamesBySentiment.fulfilled, (state, action) => {
        state.status = 'succeeded'

        // Add any fetched top names to the array
        state.topNames = action.payload
      })
      .addCase(fetchTopNamesBySentiment.rejected, (state, action) => {
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

export default topNamesBySentimentChartSlice.reducer
