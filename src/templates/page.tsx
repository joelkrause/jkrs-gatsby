import * as React from "react"
import styled from "styled-components"

import { breakpoints, colours } from '../styles/styled-components/variables';
 
import Layout from "../templates/layout"
import ComponentLoader from "../components/storyblok/ComponentLoader"
 
const Page = ({ pageContext, location }) => { 
  let story = pageContext.story
  
  const components = story.content.modules?.map(blok => {
    return (<ComponentLoader blok={blok} key={blok._uid} />)
  })
  return (
  <>
      <div className="container">
          <PageTitle>{story.name}</PageTitle>
          {components}
      </div>
  </>
)}
 
export default Page

const PageTitle = styled.h1`
  padding: 2rem 0;
`