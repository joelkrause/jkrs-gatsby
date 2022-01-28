import React, { Component, useState, useEffect } from 'react';
import {Link, PageProps} from 'gatsby'
import styled from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons'

import { breakpoints, colours } from '../../styles/styled-components/variables';


const Header: React.FC<PageProps> = () => {
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
    const [theme, setThemeState] = useState(initialValue);
    
    const setTheme = () => {
        const currentTheme = localStorage.getItem('theme')
        if(currentTheme === 'dark'){
            setThemeState('light')
            localStorage.setItem('theme','light')
        } else {
            setThemeState('dark')
            localStorage.setItem('theme','dark')
        }
    }

    useEffect(() => {
        document.documentElement.setAttribute("data-color-scheme", theme);
    });

    return (
        <HeaderEle>
        <Logo to="/">
            Joel Krause
        </Logo>
        <NavEle>
            <NavEleList>
                <NavEleListItem>
                    <Link to="/">Home</Link>
                </NavEleListItem>
                <NavEleListItem>
                    <Link to="/posts">Posts</Link>
                </NavEleListItem>
            </NavEleList>
        </NavEle>
        <ThemeSwitcher>
            <button  onClick={() => setTheme()} className={theme}>
                {theme === 'light' &&
                    <FontAwesomeIcon icon={faSun} />
                }
                <span></span>
                {theme === 'dark' &&
                    <FontAwesomeIcon icon={faMoon} />
                }                
            </button>
            {theme}
        </ThemeSwitcher>
    </HeaderEle>        
    )
}

export default Header;

const HeaderEle = styled.header`
    display:flex;
    align-items:center;
    padding:1rem;
    font-weight: 500;

    @media (min-width: ${breakpoints.xl}) {
        padding:2rem;
    }
    
    @media (min-width: ${breakpoints.xxl}) {
        padding:3rem;
        font-size:1.25rem;
    }

    @media (min-width: ${breakpoints.hd}) {
        padding:4rem;
    } 
`

const Logo = styled(props => <Link {...props} />)`
    margin:0 2rem 0 0;
    font-size:1.25rem;
    
    &:hover {
        text-decoration:underline;
    }    
`

const NavEle = styled.nav``

const NavEleList = styled.ul`
    display:flex;
    align-items:center;
    justify-content:flex-end;
`

const NavEleListItem = styled.li`
    &:not(:last-of-type){
        margin:0 2rem 0 0;
    }
    a {
        text-decoration:none;
        
        &:hover,&[aria-current="page"] {
            text-decoration:underline;
        }
    }
`

const ThemeSwitcher = styled.div`
    margin-left: auto;
    button {
        background-color:#ccc;
        width:60px;
        height:35px;
        border-radius:25px;
        position:relative;

        span {
            position:absolute;
            top:5px;
            left:5px;
            width:25px;
            height:25px;
            display:block;
            background-color:#fff;
            border-radius:25px;
            transition:all 0.35s;
        }
        svg {
            &[data-icon="sun"]{
                position: absolute;
                top: 50%;
                right: 5px;
                transform: translateY(-50%);
            }
            &[data-icon="moon"]{
                position: absolute;
                top: 50%;
                left: 5px;
                transform: translateY(-50%);
            }
        }
        &.dark {
            span {
                left:calc(100% - 30px);
            }
        }
    }
`