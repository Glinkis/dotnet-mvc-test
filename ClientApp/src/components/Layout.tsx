import React from "react"
import { Container } from "reactstrap"
import { NavMenu } from "./NavMenu"

export const Layout = (props: { children?: React.ReactNode }) => (
  <React.Fragment>
    <NavMenu />
    <Container>{props.children}</Container>
  </React.Fragment>
)
