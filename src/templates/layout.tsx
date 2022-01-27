import React from "react"

import '../styles/app.scss'

import Header from "../components/global/Header"

const Layout = ({children }) => {
  return (
    <>
      <Header/>
      <main>{children}</main>
    </>
  )
}
export default Layout