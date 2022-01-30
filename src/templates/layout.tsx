import React, {useState, useEffect } from 'react';

import '../styles/app.scss'
import Header from "../components/global/Header"
import CheckTheme from "../components/global/CheckTheme"

const Layout = ({children}) => {
  const [theme, setThemeState] = useState('light');
  const [showThemePopup, toggleThemePopup] = useState(false);
  const [changedColorScheme, setUserColorSchemePreference] = useState('');

  useEffect(() => {
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

      document.documentElement.setAttribute("data-color-scheme",theme)

      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        const newColorScheme = event.matches ? "dark" : "light";
        console.log('newColorScheme: ',newColorScheme)
        setUserColorSchemePreference(newColorScheme)
        toggleThemePopup(true)
    });      
  });
  
  const setTheme = () => {
    console.log('we hit the parent!')
      const currentTheme = localStorage.getItem('theme')
      if(currentTheme === 'dark'){
          setThemeState('light')
          localStorage.setItem('theme','light')
      } else {
          setThemeState('dark')
          localStorage.setItem('theme','dark')
      }
      toggleThemePopup(false)
  }

  const closePopup = async () => {
    toggleThemePopup(false)
  }

  return (
    <main>
      <Header theme={theme} onThemeSelect={setTheme} />
      <main>{children}</main>

      {showThemePopup &&
        <CheckTheme color={changedColorScheme} onClose={closePopup} changeScheme={setTheme}/>
      }
    </main>
  )
}
export default Layout