import React from 'react';
import styled from "styled-components"

const CheckTheme = (props) => {
    return (
        <CheckThemeWrapper>
            <CheckThemeHeading>
                Look's like you've changed your color scheme system preferences to {props.color} mode!
            </CheckThemeHeading>
            <CheckThemeButtonWrapper>
                <button onClick={() => props.onClose()}>Nah, I'm Good!</button>
                <button onClick={() => props.changeScheme()}>Yeah, please change it to {props.color === 'light' ? 'dark' : 'light'}</button>
            </CheckThemeButtonWrapper>
        </CheckThemeWrapper>
    );
}

export default CheckTheme;

const CheckThemeWrapper = styled.div`
    position:fixed;
    bottom:50px;
    left:50px;
    z-index:9;
    background-color:var(--checkThemeBackground);
    padding:2rem;
    border-radius:3px;
    @media (min-width:1024px){
        max-width:400px;
    }
`

const CheckThemeHeading = styled.h4`
    font-weight:400;
`

const CheckThemeButtonWrapper = styled.div`
    display:flex;
    align-items:center;
`