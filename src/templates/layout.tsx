import React, {useState, useEffect } from 'react';
import styled from 'styled-components'

import '../styles/app.scss'
import Header from "../components/global/Header"
import Footer from "../components/global/Footer"
import CheckTheme from "../components/global/CheckTheme"

const Layout = ({children}) => {
  const [theme, setThemeState] = useState('light');
  const [showThemePopup, toggleThemePopup] = useState(false);
  const [changedColorScheme, setUserColorSchemePreference] = useState('');

  useEffect(() => {
    console.log('useEffect on layout.tsx')
      const localStorage = window.localStorage
      const getPreferredColorScheme = () => {
          if (window.matchMedia) {
            if(window.matchMedia('(prefers-color-scheme: dark)').matches){
              return 'dark';
            } else {
              return 'light';
            }
          }
          return 'light';
      }
  
      const initialValue = localStorage.getItem('theme') ? localStorage.getItem('theme') : getPreferredColorScheme()
      setThemeState(initialValue)

      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        const newColorScheme = event.matches ? "dark" : "light";
        console.log('newColorScheme: ',newColorScheme)
        setUserColorSchemePreference(newColorScheme)
        toggleThemePopup(true)
    });

    // document.documentElement.setAttribute("data-color-scheme",theme)
  }, []);
  
  const setTheme = () => {
    console.log('we hit the parent!')
      const currentTheme = localStorage.getItem('theme')
      if(currentTheme === 'dark'){
          setThemeState('light')
          localStorage.setItem('theme','light')
          // document.documentElement.setAttribute("data-color-scheme",'light')
      } else {
          setThemeState('dark')
          localStorage.setItem('theme','dark')
          // document.documentElement.setAttribute("data-color-scheme",'dark')
      }
      toggleThemePopup(false)
  }

  const closePopup = async () => {
    toggleThemePopup(false)
  }

  return (
    <Main data-color-scheme={theme}>
      <Header theme={theme} onThemeSelect={setTheme} />
      <main>{children}</main>
      <Footer />

      {showThemePopup &&
        <CheckTheme color={changedColorScheme} onClose={closePopup} changeScheme={setTheme}/>
      }
    </Main>
  )
}
export default Layout

const Main = styled.main`
    transition: background-color 0.25s;
    background-color: var(--background-color);
    color: var(--defaultColor);
    min-height:100vh;
`