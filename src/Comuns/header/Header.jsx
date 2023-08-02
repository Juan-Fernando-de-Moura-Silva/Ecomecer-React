import React from "react"
import "./Header.css"
import Head from "./Head"
import Search from "./Search"
import NavBar from "./NavBar"

const Header = ({ CartItem }) => {
  return (
    <>
      <Head />
      <Search CartItem={CartItem} />
      <NavBar />
    </>
  )
}

export default Header