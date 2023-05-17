// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'
import example from './apps/example'
import countries from './countries'
import register from './apps/register'
import verification from './apps/verification'

// ** Reducers

export const store = configureStore({
  reducer: {
    example,
    countries,
    register,
    verification
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
