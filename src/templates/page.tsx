import * as React from "react"
import styled from "styled-components"

import { breakpoints, colours } from '../styles/styled-components/variables';
 
import Layout from "../templates/layout"
 
const Page = ({ pageContext, location }) => { 
  let story = pageContext.story
 
  return (
  <Layout>
      <div className="container">
          <PageTitle>{story.name}</PageTitle>
          <pre>{JSON.stringify(story,null,2)}</pre>
      </div>
  </Layout>
)}
 
export default Page

const PageTitle = styled.h1``