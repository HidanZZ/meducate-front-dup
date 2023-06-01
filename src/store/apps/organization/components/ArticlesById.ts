import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import DashboardService from 'src/services/dashboard'
import { Article } from 'src/types/apps/dashboard'

type State = {
  articles: Array<Article>
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null | undefined | { [key: string]: string[] }
}

const initialState: State = {
  articles: [],
  status: 'idle',
  error: null
}

// Thunk
export const fetcharticles = createAsyncThunk(
  'organization/articles/fetcharticles',
  async ({ id, page }: { id: string; page: number }, { rejectWithValue }) => {
    try {
      const response = await DashboardService.getArticlesByID(id, page)

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
const articlesSlice = createSlice({
  name: 'organization/articles',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetcharticles.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetcharticles.fulfilled, (state, action) => {
        state.status = 'succeeded'

        // Add any fetched top names to the array
        state.articles.push(...action.payload)
      })
      .addCase(fetcharticles.rejected, (state, action) => {
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

export default articlesSlice.reducer
