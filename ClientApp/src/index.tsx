import "bootstrap/dist/css/bootstrap.css"

import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"

import { App } from "./App"
import configureStore from "./store/configureStore"
import registerServiceWorker from "./registerServiceWorker"

// Get the application-wide store instance, prepopulating with state from the server where available.
const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
)

registerServiceWorker()
