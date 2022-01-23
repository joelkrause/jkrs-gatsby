import React, { Component } from 'react';
import {Link} from 'gatsby'
import styled from "styled-components"

import { breakpoints, colours } from '../styles/styled-components/variables';

class Header extends Component {
    render() {
        return (
            <HeaderEle>
                <div className="container">
                    <Link to="/">
                        Joel Krause
                    </Link>
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
                </div>
            </HeaderEle>
        );
    }
}

export default Header;

const HeaderEle = styled.header`
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
    .container{
        display:flex;
        justify-content:space-between;
        align-items:center;
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
        color:${colours.default};
        text-decoration:none;
        &:hover,&[aria-current="page"] {
            color:${colours.accent};
            text-decoration:underline;
        }
    }
`