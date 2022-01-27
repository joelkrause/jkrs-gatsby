import * as React from "react"
import styled from "styled-components"

import { breakpoints, colours } from '../styles/styled-components/variables';
 
import Layout from "../templates/layout"
 
const Page = ({ pageContext, location }) => { 
  let story = pageContext.story
 
  return (
  <Layout>
      <div className="container">
            <PostHero>
                <PostDate>{story.published_at}</PostDate>
                <PostTitle>{story.name}</PostTitle>
                <PostExcerpt>Excerpt</PostExcerpt>
            </PostHero>
      </div>
  </Layout>
)}
 
export default Page

const PostHero = styled.div`
    padding: 2rem 0;

    @media (min-width: ${breakpoints.xl}){
        padding:4rem 0;
    }
`

const PostDate = styled.div`
    margin:0 0 1rem;
    color:#ccc;
`

const PostTitle = styled.h1``

const PostExcerpt = styled.h2``