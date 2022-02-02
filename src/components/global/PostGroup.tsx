import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components'
import PostListItem from "./PostListItem"

const PostGroup = ({posts,heading,layout,showButton}) => {
    return(
        <PostGroupWrapper>
            <div className="container">
                <PostGroupHeader>
                    {heading && 
                        <PostGroupTitle>{heading}</PostGroupTitle>
                    }
                    {showButton === 'true' &&
                        <Link className="btn" to="/articles">See All Articles</Link>
                    }
                </PostGroupHeader>
                <PostGroupGrid className={layout}>
                    {posts.map(node => {
                        return (
                            <PostListItem post={node} key={node.uuid}/>
                        )
                    })}
                </PostGroupGrid>
            </div>
        </PostGroupWrapper>
    )
}

export default PostGroup;

const PostGroupWrapper = styled.div`
  padding:3rem 0;
`

const PostGroupHeader = styled.header`
    display:flex;
    justify-content:space-between;
    align-items: center;
    padding:0 0 1rem;
    margin:0 0 1rem;
`

const PostGroupTitle = styled.h2`
  margin:0;
`

const PostGroupGrid = styled.div`
    &.featured{
        display:grid:
    }
`