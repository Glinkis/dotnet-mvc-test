import React from "react"
import { useDispatch, useSelector } from "react-redux"

import { ApplicationState } from "../store"
import { counterActions } from "../store/Counter"

export const Counter = () => {
  const dispatch = useDispatch()

  const count = useSelector((state: ApplicationState) => {
    return state.counter && state.counter.count
  })

  const increment = () => {
    dispatch(counterActions.increment())
  }

  const decrement = () => {
    dispatch(counterActions.decrement())
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

      <button type="button" className="btn btn-primary btn-lg" onClick={decrement}>
        Decrement
      </button>
    </React.Fragment>
  )
}
