import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import DashboardService from 'src/services/dashboard'
import { DateRangeWithSentiment } from 'src/types/apps/dashboard'

type State = {
  keywords: any
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null | undefined | { [key: string]: string[] }
}

const initialState: State = {
  keywords: [],
  status: 'idle',
  error: null
}

// Thunk
export const getKeywordAnalysis = createAsyncThunk(
  'dashboard/keywordAnalysisChart/getKeywordAnalysis',
  async (fields: DateRangeWithSentiment, { rejectWithValue }) => {
    try {
      const response = await DashboardService.getKeywordAnalysis(fields)

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
const keywordAnalysisChartSlice = createSlice({
  name: 'dashboard/keywordAnalysisChart',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getKeywordAnalysis.pending, state => {
        state.status = 'loading'
      })
      .addCase(getKeywordAnalysis.fulfilled, (state, action) => {
        state.status = 'succeeded'

        // Add any fetched top names to the array
        state.keywords = action.payload
      })
      .addCase(getKeywordAnalysis.rejected, (state, action) => {
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

export default keywordAnalysisChartSlice.reducer
