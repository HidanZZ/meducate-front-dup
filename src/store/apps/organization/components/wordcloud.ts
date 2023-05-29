import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import DashboardService from 'src/services/dashboard'

type State = {
  wordcloud: string | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null | undefined | { [key: string]: string[] }
}

const initialState: State = {
  wordcloud: null,
  status: 'idle',
  error: null
}

type fetchProps = {
    id: string
    sentiment: string
}

// Thunk
export const getWordcloud = createAsyncThunk(
  'organization/wordcloud/getWordcloud',
  async ({id,sentiment}:fetchProps, { rejectWithValue }) => {
    try {
      const response = await DashboardService.getWordCloudById(id,sentiment)

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
const wordcloudSlice = createSlice({
  name: 'organization/wordcloud',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getWordcloud.pending, state => {
        state.status = 'loading'
      })
      .addCase(getWordcloud.fulfilled, (state, action) => {
        state.status = 'succeeded'

        // Add any fetched top names to the array
        state.wordcloud = action.payload
      })
      .addCase(getWordcloud.rejected, (state, action) => {
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

export default wordcloudSlice.reducer
