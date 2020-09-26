import { Action, combineReducers } from "@reduxjs/toolkit"

import counter from "./Counter"
import weatherForecasts from "./WeatherForecasts"

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducer = combineReducers({
  counter,
  weatherForecasts,
})

// The top-level state object
export type ApplicationState = ReturnType<typeof reducer>

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction = Action> {
  (dispatch: (action: TAction) => void, getState: () => ApplicationState): void
}
