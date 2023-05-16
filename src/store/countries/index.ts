import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ICountry, ICity } from 'country-state-city'
import { Country as CSCCountry, City as CSCCity } from 'country-state-city'

interface CountriesState {
  countries: Array<ICountry>
  cities: Array<ICity> | undefined
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | undefined | null
}

const initialState: CountriesState = {
  countries: [],
  cities: [],
  status: 'idle',
  error: null
}

export const fetchCountries = createAsyncThunk('countries/fetchCountries', async () => {
  // Use the getAllCountries function from the package to fetch all countries
  const countries = CSCCountry.getAllCountries()

  return countries
})

export const fetchCities = createAsyncThunk('countries/fetchCities', async (ciso: string) => {
  // Use the getStatesOfCountry function to fetch all states of a country
  return CSCCity.getCitiesOfCountry(ciso)
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
