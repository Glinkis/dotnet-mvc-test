import React from "react"
import { Route } from "react-router-dom"

import { Layout } from "./components/Layout"
import { Home } from "./components/Home"
import { Counter } from "./components/Counter"
import { FetchData } from "./components/FetchData"

import "./custom.css"

export const App = () => (
  <Layout>
    <Route exact path="/" component={Home} />
    <Route path="/counter" component={Counter} />
    <Route path="/fetch-data/:startDateIndex?" component={FetchData} />
  </Layout>
)
