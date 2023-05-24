import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import DashboardService from 'src/services/dashboard'
import { SearchName } from 'src/types/apps/dashboard'

type State = {
  names: Array<SearchName>
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null | undefined | { [key: string]: string[] }
}

const initialState: State = {
  names: [],
  status: 'idle',
  error: null
}

// Thunk
export const fetchNames = createAsyncThunk(
  'dashboard/searchNames/fetchNames',
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await DashboardService.searchNames(name)

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
const searchNamesSlice = createSlice({
  name: 'dashboard/searchNames',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchNames.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchNames.fulfilled, (state, action) => {
        state.status = 'succeeded'

        // Add any fetched top names to the array
        state.names = action.payload
      })
      .addCase(fetchNames.rejected, (state, action) => {
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

export default searchNamesSlice.reducer
