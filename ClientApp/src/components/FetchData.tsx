import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"

import { ApplicationState } from "../store"
import * as WeatherForecastsStore from "../store/WeatherForecasts"

export const FetchData = () => {
  const dispatch = useDispatch()

  const params = useParams<{ startDateIndex: string }>()
  const startDateIndex = parseInt(params.startDateIndex, 10) || 0

  useEffect(() => {
    dispatch(WeatherForecastsStore.actionCreators.requestWeatherForecasts(startDateIndex))
  }, [startDateIndex])

  const { isLoading, forecasts } = useSelector((state: ApplicationState) => state.weatherForecasts)

  const renderForecastsTable = () => {
    return (
      <table className="table table-striped" aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {forecasts.map((forecast: WeatherForecastsStore.WeatherForecast) => (
            <tr key={forecast.date}>
              <td>{forecast.date}</td>
              <td>{forecast.temperatureC}</td>
              <td>{forecast.temperatureF}</td>
              <td>{forecast.summary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  const renderPagination = () => {
    const prevStartDateIndex = (startDateIndex || 0) - 5
    const nextStartDateIndex = (startDateIndex || 0) + 5

    return (
      <div className="d-flex justify-content-between">
        <Link className="btn btn-outline-secondary btn-sm" to={`/fetch-data/${prevStartDateIndex}`}>
          Previous
        </Link>
        {isLoading && <span>Loading...</span>}
        <Link className="btn btn-outline-secondary btn-sm" to={`/fetch-data/${nextStartDateIndex}`}>
          Next
        </Link>
      </div>
    )
  }

  return (
    <React.Fragment>
      <h1 id="tabelLabel">Weather forecast</h1>
      <p>This component demonstrates fetching data from the server and working with URL parameters.</p>
      {renderForecastsTable()}
      {renderPagination()}
    </React.Fragment>
  )
}
