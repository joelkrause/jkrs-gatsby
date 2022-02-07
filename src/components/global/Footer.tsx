import React from 'react';
import {Link, useStaticQuery, graphql} from 'gatsby'
import styled from "styled-components"

import { breakpoints, colours } from '../../styles/styled-components/variables';

const Footer = () => {
    const data = useStaticQuery(graphql`
        query FooterNav {
            Storyblok {
                GlobalcontentItem(id: "global-content", resolve_links:"url") {
                    content {
                        footer_nav
                        social_links
                    }
                }     
            }
        }
    `)

  const FooterNav = data.Storyblok.GlobalcontentItem.content.footer_nav
  const SocialLinks = data.Storyblok.GlobalcontentItem.content.social_links

    return (
        <FooterEle>
            <FooterGrid>
                <FooterGridItem>
                    &copy; {new Date().getFullYear()} Joel Krause
                </FooterGridItem>
                {FooterNav &&
                    <FooterGridItem data-align="right">
                        <h5>Quick Links</h5>
                        <FooterNavUl>
                            {FooterNav.map(nav => {
                                return (
                                    <FooterNavLi>
                                        <Link to={nav.link.cached_url}>{nav.title}</Link>
                                    </FooterNavLi>
                                )
                            })}
                        </FooterNavUl>
                    </FooterGridItem>
                }
                {SocialLinks &&
                    <FooterGridItem data-align="right">
                        <h5>Social Links</h5>
                        <FooterNavUl>
                            {SocialLinks.map(nav => {
                                return (
                                    <FooterNavLi>
                                        <a href={nav.link.url} target="_blank">{nav.title}</a>
                                    </FooterNavLi>
                                )
                            })}
                        </FooterNavUl>
                    </FooterGridItem>
                }
            </FooterGrid>
        </FooterEle>
    );
};

export default Footer;

const FooterEle = styled.footer`
    padding:1rem;

    @media (min-width: ${breakpoints.xl}) {
        padding:2rem;
    }

    @media (min-width: ${breakpoints.xxl}) {
        padding:4rem;
        font-size:1.25rem;
    }
`

const FooterGrid = styled.div`
    display:grid;
    grid-template-columns:repeat(3,1fr);
`

const FooterGridItem = styled.div`
    &[data-align="right"]{
        text-align: right;
    }
`

const FooterNavUl = styled.ul``

const FooterNavLi = styled.li`
    &:not(:last-of-type){
        a {
            display:block;
            padding:0 0 0.75rem;
        }
    }
    a {
        transition: all 0.35s;

        &:hover {
            opacity:0.5;
            padding-right:0.5rem;
        }
    }
`