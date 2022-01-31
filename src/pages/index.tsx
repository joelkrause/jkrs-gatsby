import React, { Component } from 'react';
import { PageProps, useStaticQuery, graphql, Link } from 'gatsby';
import { render } from 'storyblok-rich-text-react-renderer';
import styled from 'styled-components'

import Layout from "../templates/layout"
import PostGroup from "../components/global/PostGroup"
import { breakpoints, colours } from '../styles/styled-components/variables';

const IndexPage: React.FC<PageProps> = () => {
  const data = useStaticQuery(graphql`
  query HomePage {
    Storyblok {
      HomeItem(id: "home") {
        id
        name
        content {
          hero_content
          hero_image {
            filename
            copyright
            alt
            title
            name
            id
            focus
          }
        }
      }
      PostItems {
        items {
          full_slug
          name
          published_at
          content {
            body
            component
            excerpt
            likes
            post_hero
            post_icon
            categories {
              uuid
              name
            }            
          }
        }
      }      
    }
  }
`)

const page = data.Storyblok.HomeItem
const posts = data.Storyblok.PostItems.items

  return (
    <Layout>
      <HomeHero>
        <div className="container">
          <HomeHeroGrid>
            <HomeHeroImage>
              <img src={page.content.hero_image.filename} />
            </HomeHeroImage>
            <HomeHeroContent>
              {render(page.content.hero_content)}
            </HomeHeroContent>
          </HomeHeroGrid>
        </div>
      </HomeHero>
      <PostGroup showButton="true" posts={posts} heading="Featured Articles" layout="featured" />
      <PostGroup showButton="true" posts={posts} heading="Latest Articles" layout="list"/>
    </Layout>
  )
}

export default IndexPage

const HomeHero = styled.div`
  @media (min-width: ${breakpoints.xl}) {
    padding:4rem 0;
  }
`

const HomeHeroGrid = styled.div`
  @media (min-width: ${breakpoints.xl}) {
    display:flex;
    align-items:center;
  }
`

const HomeHeroImage = styled.div`
  min-width:40%;
`

const HomeHeroContent = styled.div`
  padding-left:5vw;
  p {
    line-height:1.5;
  }
`