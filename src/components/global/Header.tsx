import React, { Component, useState, useEffect } from 'react';
import {Link, PageProps, useStaticQuery, graphql} from 'gatsby'
import styled from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons'
import { faHouseUser } from '@fortawesome/free-solid-svg-icons'

import { breakpoints, colours } from '../../styles/styled-components/variables';


const Header = (props) => {
    const data = useStaticQuery(graphql`
    query GlobalContent {
      Storyblok {
        GlobalcontentItem(id: "global-content", resolve_links:"url") {
            content {
                header_nav
            }
        }     
      }
    }
  `)

  const HeaderNav = data.Storyblok.GlobalcontentItem.content.header_nav

    return (
        <HeaderEle>
            <NavEle>
                <NavEleList>
                    <NavEleListItem>
                        <Link to="/">
                            <FontAwesomeIcon icon={faHouseUser} />
                        </Link>
                    </NavEleListItem>                    
                    {HeaderNav.map(node => {
                    return (
                        <NavEleListItem>
                            <Link to={`/${node.link.story ? node.link.story.full_slug : node.link.cached_url}`}>{node.title}</Link>
                        </NavEleListItem>
                    )
                    })}
                </NavEleList>
            </NavEle>
            <ThemeSwitcher>
                <button onClick={() => props.onThemeSelect()} className={props.theme}>
                    {props.theme === 'light' &&
                        <FontAwesomeIcon icon={faSun} />
                    }
                    <span></span>
                    {props.theme === 'dark' &&
                        <FontAwesomeIcon icon={faMoon} />
                    }                
                </button>
            </ThemeSwitcher>
        </HeaderEle>        
    )
}

export default Header;

const HeaderEle = styled.header`
    display:flex;
    align-items:center;
    padding:1rem;

    @media (min-width: ${breakpoints.xl}) {
        padding:2rem;
    }
    
    @media (min-width: ${breakpoints.xxl}) {
        padding:4rem;
        font-size:1.25rem;
    }
`

const Logo = styled(props => <Link {...props} />)`
    margin:0 2rem 0 0;
    font-size:1.25rem;
    font-weight:700;
    
    &:hover {
        text-decoration:underline;
    }

    &:after {
        content:'|';
        padding:0 0 0 2rem;
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