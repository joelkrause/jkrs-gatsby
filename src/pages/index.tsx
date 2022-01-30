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
          <HomeHeroImage>
            <img src={page.content.hero_image.filename} />
          </HomeHeroImage>
          <HomeHeroContent>
            {render(page.content.hero_content)}
          </HomeHeroContent>
        </div>
      </HomeHero>
      <PostGroup posts={posts} heading="Featured Posts" layout="featured" />
      <PostGroup posts={posts} heading="Latest Posts" layout="list"/>
    </Layout>
  )
}

export default IndexPage

const HomeHero = styled.div`
  @media (min-width: ${breakpoints.xl}) {
    padding:4rem 0;
  }

  .container {
    @media (min-width: ${breakpoints.xl}) {
      display:flex;
      align-items:center;
    }
  }
`

const HomeHeroImage = styled.div`
  width:50%;
`

const HomeHeroContent = styled.div`
  padding-left:5vw;
`