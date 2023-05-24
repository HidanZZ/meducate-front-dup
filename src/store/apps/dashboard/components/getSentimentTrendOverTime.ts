import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import DashboardService from 'src/services/dashboard'
import { DateRange, SentimentTrend } from 'src/types/apps/dashboard'

type State = {
  trend: Array<SentimentTrend>
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null | undefined | { [key: string]: string[] }
}

const initialState: State = {
  trend: [],
  status: 'idle',
  error: null
}

// Thunk
export const getTrend = createAsyncThunk(
  'dashboard/SentimentTrendOverTime/getTrend',
  async (dateRange: DateRange, { rejectWithValue }) => {
    try {
      const response = await DashboardService.getSentimentTrendOverTime(dateRange)

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
const SentimentTrendOverTimeSlice = createSlice({
  name: 'dashboard/SentimentTrendOverTime',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getTrend.pending, state => {
        state.status = 'loading'
      })
      .addCase(getTrend.fulfilled, (state, action) => {
        state.status = 'succeeded'

        // Add any fetched top names to the array
        state.trend = action.payload
      })
      .addCase(getTrend.rejected, (state, action) => {
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

export default SentimentTrendOverTimeSlice.reducer
