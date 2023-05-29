import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import DashboardService from 'src/services/dashboard'
import { EntityTreeMap } from 'src/types/apps/dashboard'

type State = {
  entities: EntityTreeMap | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null | undefined | { [key: string]: string[] }
}

const initialState: State = {
  entities: null,
  status: 'idle',
  error: null
}

// Thunk
export const fetchEntityTreemap = createAsyncThunk(
  'organization/EntityTreemap/fetchEntityTreemap',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await DashboardService.getEntityTreeMap(id)

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
const entityTreeMapSlice = createSlice({
  name: 'organization/EntityTreemap',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchEntityTreemap.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchEntityTreemap.fulfilled, (state, action) => {
        state.status = 'succeeded'

        // Add any fetched top names to the array
        state.entities = action.payload
      })
      .addCase(fetchEntityTreemap.rejected, (state, action) => {
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

export default entityTreeMapSlice.reducer
