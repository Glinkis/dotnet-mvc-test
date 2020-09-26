import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunkAction } from "./"

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface WeatherForecastsState {
  isLoading: boolean
  startDateIndex?: number
  forecasts: WeatherForecast[]
}

export interface WeatherForecast {
  date: string
  temperatureC: number
  temperatureF: number
  summary: string
}

const initialState: WeatherForecastsState = {
  isLoading: false,
  forecasts: [],
}

const weatherForecastsSlice = createSlice({
  name: "weatherForecasts",
  initialState,
  reducers: {
    requestWeatherForecasts(state, action: PayloadAction<RequestWeatherForecastsPayload>) {
      return {
        startDateIndex: action.payload.startDateIndex,
        forecasts: state.forecasts,
        isLoading: true,
      }
    },
    receiveWeatherForecasts(state, action: PayloadAction<ReceiveWeatherForecastsPayload>) {
      // Only accept the incoming data if it matches the most recent request. This ensures we correctly
      // handle out-of-order responses.
      if (action.payload.startDateIndex === state.startDateIndex) {
        return {
          startDateIndex: action.payload.startDateIndex,
          forecasts: action.payload.forecasts,
          isLoading: false,
        }
      }
    },
  },
})

export default weatherForecastsSlice.reducer

const { requestWeatherForecasts, receiveWeatherForecasts } = weatherForecastsSlice.actions

interface RequestWeatherForecastsPayload {
  startDateIndex: number
}

interface ReceiveWeatherForecastsPayload {
  startDateIndex: number
  forecasts: WeatherForecast[]
}

export const fetchWeatherForecasts = (startDateIndex: number): AppThunkAction => {
  return async (dispatch, getState) => {
    const appState = getState()

    if (appState && appState.weatherForecasts && startDateIndex !== appState.weatherForecasts.startDateIndex) {
      dispatch(requestWeatherForecasts({ startDateIndex: startDateIndex }))

      const response = await fetch(`weatherforecast`)
      const data: WeatherForecast[] = await response.json()

      dispatch(receiveWeatherForecasts({ startDateIndex: startDateIndex, forecasts: data }))
    }
  }
}
