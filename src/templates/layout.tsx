import React from "react"
import { globalHistory } from '@reach/router';

import '../styles/app.scss'

import Header from "../components/Header"

const Layout = ({children }) => {
  return (
    <>
      <Header/>
      <main>{children}</main>
    </>
  )
}
export default Layout