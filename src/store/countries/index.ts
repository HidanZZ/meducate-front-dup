// src/store/countries/index.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { City, Country } from 'src/types/misc/countries'

interface CountriesState {
  countries: Array<Country>
  cities: Array<City>
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | undefined | null
}

const initialState: CountriesState = {
  countries: [],
  cities: [],
  status: 'idle',
  error: null
}

//add "X-CSCAPI-KEY", "API_KEY" to headers
const headers = {
  'X-CSCAPI-KEY': process.env.NEXT_PUBLIC_CSCAPI_KEY,
  'Content-Type': 'application/json'
}

export const fetchCountries = createAsyncThunk('countries/fetchCountries', async () => {
  const response = await axios.get('https://api.countrystatecity.in/v1/countries', { headers })

  return response.data
})

export const fetchCities = createAsyncThunk('countries/fetchCities', async (ciso: string) => {
  const response = await axios.get(`https://api.countrystatecity.in/v1/countries/${ciso}/cities`, { headers })

  return response.data
})

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCountries.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.countries = action.payload
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(fetchCities.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.cities = action.payload
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default countriesSlice.reducer
