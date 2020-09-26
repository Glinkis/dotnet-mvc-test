import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { ApplicationState } from "../store"
import * as CounterStore from "../store/Counter"

export const Counter = () => {
  const dispatch = useDispatch()
  const count = useSelector((state: ApplicationState) => state.counter && state.counter.count)

  const increment = () => {
    dispatch(CounterStore.actionCreators.increment())
  }

  return (
    <React.Fragment>
      <h1>Counter</h1>

      <p>This is a simple example of a React component.</p>

      <p aria-live="polite">
        Current count: <strong>{count}</strong>
      </p>

      <button type="button" className="btn btn-primary btn-lg" onClick={increment}>
        Increment
      </button>
    </React.Fragment>
  )
}
